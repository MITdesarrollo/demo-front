import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shoppingCart } from '@/redux/feature/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import PopUpCart from '@/components/popupCart';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import './styles.scss';

export default function AddCartButton(props) {
  const [showPopupCart, setShowPopupCart] = useState(false);
  const togglePopup = () => {
    setShowPopupCart(!showPopupCart);
  };

  const { packageId, data, quantity = 1 } = props;
  const shoppingCartInfo = useSelector((state) => state.counter?.shoppingCart);
  const [count, setCount] = useState(
    shoppingCartInfo.shoppingCartPackages &&
      shoppingCartInfo.shoppingCartPackages.length > 0
      ? shoppingCartInfo.shoppingCartPackages[0].quantity
      : 1
  );

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
    togglePopup();
  };

  return (
    <div className='addCartCard'>
      <button
        style={{
          width: window.innerWidth > 768 && '180px',
          height: window.innerWidth <= 768 && '50px',
        }}
        className='btnRadien'
        onClick={addOrCreatedShoppingCart}
      >
        Agregar al carrito
      </button>
      <Modal
        open={showPopupCart}
        onClose={togglePopup}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
          <PopUpCart close={togglePopup} data={data} quantity={quantity} />
      </Modal>
    </div>
  );
}
