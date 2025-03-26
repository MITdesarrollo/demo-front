'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ClubVip from '@/components/clubVip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import CartResumen from '@/components/cart/components/cartResumen';
import { calculateTotalPrice, formatCurrency } from '@/utils/utils';
import RegisterSuccess from '@/components/states/registerSuccess';
import CartContentInfo from '@/components/cart/components/contentInfo';
import ConfirmShopping from '@/components/cart/components/confirmShopping';
import { finishShoppingCartCheckout } from '@/redux/feature/counterSlice';
import {
  FinishCheckout,
  SetShoppingCartAplicationUser,
} from '@/redux/feature/counterApi';

import './styles.scss';

export default function Cart() {
  const [credits, setCredits] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [approve, setApprove] = useState(false);
  const [closeInfo, setCloseInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmCheckout, setConfirmCheckout] = useState(false);
  const [resultDreamon, setResultDreamon] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const api = process.env.apiImages;
  const router = useRouter();
  const dispatch = useDispatch();

  const dataShoppingCart = useSelector((state) => state.counter.shoppingCart);
  const leadId = dataShoppingCart.leadId;

  const userAviable = useSelector((state) => state.counter.user);

  const shoppingCartId = dataShoppingCart?.id;

  const dreamerGiverId =
      userAviable?.info?.[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ];

  useEffect(() => {
    const totalPriceCalculate = calculateTotalPrice(
        dataShoppingCart.packages,
        dataShoppingCart.shoppingCartPackages
    );
    setTotalPrice(totalPriceCalculate);

    if (userAviable?.info && dataShoppingCart?.id) {
      SetShoppingCartAplicationUser(shoppingCartId, dreamerGiverId, dispatch);
    }
  }, [
    dataShoppingCart?.id,
    dataShoppingCart.packages,
    dataShoppingCart.shoppingCartPackages,
    dispatch,
    dreamerGiverId,
    shoppingCartId,
    userAviable?.info,
  ]);


  const vewCartInfo = userAviable.login || closeInfo;

  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    // Si hay un mensaje de error, configuramos un temporizador para limpiarlo después de 5 segundos
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000); // 5 segundos


      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSucess = async () => {
    try {
      setErrorMessage('');

      try {
        const result = await FinishCheckout(shoppingCartId, leadId);
        console.log("Resultado de FinishCheckout:", result);

        if (result) {
          setConfirmCheckout(true);
          setResultDreamon(result);
          dispatch(finishShoppingCartCheckout());
        } else {

          setErrorMessage('Complete y guarde los datos de envío antes de confirmar el pedido');
        }
      } catch (apiError) {
        console.error("Error en FinishCheckout:", apiError);

        setErrorMessage('Complete y guarde los datos de envío antes de confirmar el pedido');
      }
    } catch (error) {
      console.error('handleSucess - Error general:', error);
      setErrorMessage('Complete y guarde los datos de envío antes de confirmar el pedido');
    }
  };


  return (
      <>
        <main className='cart'>
          {!vewCartInfo ? (
              <section className='cart_info'>
                <div className='cart_infoExclamation'>
                  <p>i</p>
                </div>
                <h3 style={{ color: 'black' }}>
                  Para confirmar tu pedido debes iniciar sesión o registrarte
                </h3>
                <FontAwesomeIcon
                    icon={faXmark}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCloseInfo(true)}
                />
              </section>
          ) : null}
          <div
              className='cart_content_head'
              style={!confirmCheckout ? { marginBottom: '20px' } : null}
          >
            <section className='cart_content_userAviable'>
              <div className='infoLeft' onClick={() => router.push('/search')}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ width: '7px' }} />
                <p className='userAviable_back'>Seguí buscando el regalo ideal</p>
              </div>
              <div>
                <h1 className='userAviable_title'>
                  {!confirmCheckout
                      ? 'Mi carrito'
                      : '¡Enviamos tu solicitud correctamente!'}
                </h1>
              </div>
              <div className='info'>
                {userAviable.login && !confirmCheckout ? (
                    <>
                      <div className='info_001'>
                        <Image
                            src={`${api}/[cart]_ok.svg`}
                            alt='ok'
                            width={14}
                            height={14}
                        />
                        <p className='userAviable_info01'>
                          Conectado como {userAviable.info.FirstName}{' '}
                          {userAviable.info.LastName}
                        </p>
                      </div>
                      <p className='userAviable_info02'>
                        Tu crédito disponible es:{' '}
                        <span style={{ color: '#ed8067' }}>
                      {formatCurrency(credits)}
                    </span>
                      </p>
                    </>
                ) : null}
              </div>
            </section>
          </div>
          <div
              className='cart_content'
              style={confirmCheckout ? { justifyContent: 'center' } : null}
          >
            {!confirmCheckout ? (
                <>
                  <CartContentInfo
                      userAviable={userAviable}
                      dataShoppingCart={dataShoppingCart}
                      approve={approve}
                      handleSucess={handleSucess}
                      setApprove={setApprove}
                      errorMessage={errorMessage}
                  />
                  <CartResumen
                      approve={approve}
                      setApprove={setApprove}
                      total={formatCurrency(totalPrice)}
                      dataShoppingCart={dataShoppingCart}
                      handleSucess={handleSucess}
                  />
                </>
            ) : (
                <ConfirmShopping data={resultDreamon} />
            )}
          </div>
        </main>
        <ClubVip />
        <section className='registerSuccessCart'>
          {showSuccess && <RegisterSuccess onClose={handleCloseModal} />}
        </section>
      </>
  );
}
