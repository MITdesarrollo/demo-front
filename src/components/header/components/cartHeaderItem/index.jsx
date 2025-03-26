import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { removePackage } from '@/redux/feature/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '@/utils/utils';

import './styless.scss';

export default function CartHeaderItem({ data, dataPackages }) {
  const uuid = useSelector((state) => state.counter.shoppingCart?.id);

  const packageQuantity = dataPackages.find(
    (item) => item.packageId === data.id
  );

  const dispatch = useDispatch();

  const price = data.price * packageQuantity.quantity;

  const handledClic = () => {
    dispatch(removePackage({ uuid, packageId: data.id }));
  };

  return (
    <main className='cartHeaderItem'>
      <section className='cartItem_img'>
        <Image
          className='cartItem_img_format'
          src={data.image}
          alt='imgage'
          width={105.11}
          height={105.11}
        />
      </section>
      <section className='cartItem_info'>
        <h2 className='cartItem_info_title'>{data.name}</h2>
        <div className='cartItem_info_pin'>
          <div>
            <FontAwesomeIcon icon={faLocationDot} style={{ width: '10px' }} />
          </div>
          <p className='cartItem_info_location'>{data.locationName}</p>
        </div>
        <p className='cartItem_info_qnt'>
          cantidad: {packageQuantity.quantity}
        </p>
        <div className='cartItem_info_bottom'>
          <p className='cartItem_info_btn'>Subtotal: {formatCurrency(price)}</p>
          <button className='cartItem_btn' onClick={handledClic}>
            Eliminar
          </button>
        </div>
      </section>
    </main>
  );
}
