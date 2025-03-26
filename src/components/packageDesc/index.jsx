import Image from 'next/image';
import HowToSend from '../howToSend';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { removePackage } from '@/redux/feature/counterSlice';

import './styless.scss';

export default function PackageDescription({ data, index }) {
  const uuid = useSelector((state) => state.counter.shoppingCart?.id);
  const quantityPackages = useSelector(
    (state) => state.counter.shoppingCart?.shoppingCartPackages
  );
  const packageQuantity = quantityPackages.find(
    (item) => item.packageId === data.id
  );
  const [ctu, setCtu] = useState(packageQuantity.quantity);

  const handleDecrement = () => {
    if (ctu > 1) {
      setCtu(ctu - 1);
    }
  };

  const handleIncrement = () => {
    setCtu(ctu + 1);
  };

  const dispatch = useDispatch();

  const handledClic = () => {
    dispatch(removePackage({ uuid, packageId: data.id }));
  };

  const formattedNumber = (data.price * ctu).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const api = process.env.apiImages;

  return (
    <>
      <main className='main_content'>
        <div className='content'>
          <div className='image_container'>
          <img src={data?.image} alt='image_dreamon' className='image_dreamon' width={'100%'} />

          {/* <Image
            className='content_image'
            src={data.image}
            alt='image_dreamon'
            width={
              window !== "undefined" && window.innerWidth <= 768
                ? 380
                : 484.55
            }
            height={
              window !== "undefined" && window.innerWidth <= 768
                ? 220
                : 400.09
            }
          /> */}
          </div>
          <div className='content_info'>
            <div className='content_info_titleBtn'>
              <h3>{data.name}</h3>
              <button className='content_info_btn' onClick={handledClic}>
                Eliminar
              </button>
            </div>
            <div className='content_info_location'>
              <Image
                alt='location'
                src={`${api}/[all]_pinLocation.svg`}
                width={13.5}
                height={15}
              />
              <p>{data.locationName}</p>
            </div>
            <div className='content_info_capacity'>
              <Image
                alt='persons'
                src={`${api}/[all]_grup.svg`}
                width={15}
                height={8}
              />
              <p>Para {data.paxNumber} personas</p>
            </div>
            <p className='content_info_amount'>Cantidad: {ctu}</p>
            <div className='content_info_set'>
              <div className='content_set'>
                {/* <p className='content_info_setctu'>Cantidad Máx {20}</p> */}
                {/* <div className='content_info_set_btns'>
                  <button
                    className='btn_set01'
                    onClick={handleDecrement}
                    disabled={ctu === 1}
                  >
                    -
                  </button>
                  <p className='showSet'>{ctu}</p>
                  <button
                    className='btn_set02'
                    onClick={handleIncrement}
                    disabled={ctu === 20}
                  >
                    +
                  </button>
                </div> */}
              </div>
              <h3 className='content_info_price'>{formattedNumber}</h3>
            </div>
          </div>
        </div>
      </main>
      <HowToSend ctu={ctu} index={index} />
    </>
  );
}
