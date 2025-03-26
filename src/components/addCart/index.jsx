import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shoppingCart } from '@/redux/feature/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SetFavorityPackage } from '@/redux/feature/counterApi';

import './styles.scss';

export default function AddCart(props) {
  const { show, packageId, data, setQuantity } = props;
  const shoppingCartInfo = useSelector((state) => state.counter?.shoppingCart);
  const [count, setCount] = useState(
    // shoppingCartInfo.shoppingCartPackages &&
    //   shoppingCartInfo.shoppingCartPackages.length > 0
    //   ? shoppingCartInfo.shoppingCartPackages[0].quantity
    //   : 1
    1
  );

  const userInfo = useSelector((state) => state.counter?.user?.info);
  const dreamerId =
    userInfo?.[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  const [isFavorite, setIsFavorite] = useState(data?.isFavorite);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const formattedNumber = data.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  const monthStartDate = startDate.getMonth();
  const yearStartDate = startDate.getFullYear();

  const monthEndDate = endDate.getMonth();
  const yearEndDate = endDate.getFullYear();

  const nombresMeses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const startDateFormat = `${nombresMeses[monthStartDate]} ${yearStartDate}`;
  const endDateFormat = `${nombresMeses[monthEndDate]} ${yearEndDate}`;

  const dispatch = useDispatch();

  const addOrCreatedShoppingCart = () => {
    if (!shoppingCartInfo.id) {
      dispatch(
        shoppingCart({
          uuid: uuidv4(),
          packageId,
          quantity: count,
          isNew: true,
        })
      );
    } else {
      dispatch(
        shoppingCart({
          uuid: shoppingCartInfo.id,
          packageId,
          quantity: count,
          isNew: false,
        })
      );
    }
    setQuantity(count);
    show();
  };

  const desList = [
    `Para ${data.paxNumber} personas`,
    `${data.hotelNights} noches`,
    'Cantidad',
  ];

  const desInfo = [
    '1 año para usar tu Dreamon',
    'No admite cambios',
    'Nuestro precio garantizado',
    'Proveedores certificados',
  ];

  const handleToggleFavorite = async () => {
    try {
      // optimistic update
      setIsFavorite(!isFavorite);

      await SetFavorityPackage(data?.id, dreamerId, !isFavorite);
    } catch (error) {
      console.log(error);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <main className='addCartCard'>
      <div className='addCart_info'>
        <div className='addCart_info_01'>
          <h3>{formattedNumber}</h3>
          {userInfo && (
            <FontAwesomeIcon
              icon={isFavorite ? solidHeart : regularHeart}
              style={{ cursor: 'pointer', color: '#ed8067' }}
              onClick={handleToggleFavorite}
            />
          )}
        </div>
        <div className='addCardList'>
          <div className='addCart_info_list'>
            <ul>
              {desList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='addCard_info_lessOrMore'>
            <button
              className='btnLess'
              onClick={handleDecrement}
              disabled={count === 1}
            >
              -
            </button>
            <div className='infoLessorMore'>
              <p>{count}</p>
            </div>
            <button className='btnMore' onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className='addCart_validation'>
        <div className='addCart_validation_title'>
          <FontAwesomeIcon
            icon={faCalendarDays}
            style={{ width: '12px', height: '12px', color: '#262633' }}
          />
          <h2>Válido para utilizar desde:</h2>
        </div>
        <div className='addCart_validation_date'>
          <p>
            {startDateFormat} a {endDateFormat} Cualquier día
          </p>
        </div>
        <div className='addCart_validation_desc'>
          <ul>
            {desInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className='btnAddCard' onClick={() => addOrCreatedShoppingCart()}>
        Añadir a carrito
      </button>
    </main>
  );
}
