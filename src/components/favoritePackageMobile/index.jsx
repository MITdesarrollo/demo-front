/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '@/utils/utils';
import AddCartButton from '../addCartButton';

import './styles.scss';

export default function FavoritePackageMobile({ data }) {
  const api = process.env.apiImages;
  const price = formatCurrency(data.price);

  return (
    <main className='favPackMobile'>
      <section className='favPackMobile_section'>
        <img src={data.image} alt='img_pacakge' style={{ width: '100%' }} />
        <div className='favPackMobile_infoTitle'>
          <h2 className='favPackMobile_title'>{data.name}</h2>
          <FontAwesomeIcon
            icon={solidHeart}
            style={{
              color: '#ed8067',
              width: '18pt',
              height: '18pt',
              marginTop: '5px',
            }}
            onClick={() => console.log('clic favorite')}
          />
        </div>
        <div className='favPackMobile_info'>
          <Image
            alt='location'
            style={{ marginRight: '8px' }}
            src={`${api}/[all]_pinLocation.svg`}
            width={13.5}
            height={15}
          />
          <p className='favPackMobile_nameLocation'>{data.locationName}</p>
        </div>
        <div className='favPackMobile_info'>
          <Image
            alt='persons'
            style={{ marginRight: '8px' }}
            src={`${api}/[all]_grup.svg`}
            width={18}
            height={12}
          />
          <p className='favPackMobile_maxNum'>Para {data.paxNumber} personas</p>
        </div>
        <div className='favPackMobile_selectOptions'>
          <h3 className='favPackMobile_selectOptions_mx'>Cantidad Máx 20</h3>
          <div className='favPackMobile_selectCant'>
            <p># : ##</p>
          </div>
        </div>
        <p className='favPackMobile_price'>{price}</p>
        <section className='favPackMobile_btn'>
          <AddCartButton data={data} packageId={data?.id} quantity={1} />
        </section>
        <div
          style={{
            borderBottom: '2px solid rgba(196, 196, 196, 0.3)',
            margin: '40pt 0 40pt 0',
          }}
        ></div>
      </section>
    </main>
  );
}
