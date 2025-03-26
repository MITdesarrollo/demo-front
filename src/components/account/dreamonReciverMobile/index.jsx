import Image from 'next/image';
import { formatCurrency } from '@/utils/utils';

import './styles.scss';

export default function DreamonReciverMobile({ data }) {
  const api = process.env.apiImages;
  const price = formatCurrency(data?.package.price);

  return (
    <main className='reciverMobile'>
      <section className='reciverMobile_section'>
        <Image
          className='reciverMobile_Content_image'
          src={data?.package.image}
          alt='image_dreamon'
          width={342}
          height={207.32}
        />
        <div className='reciverMobile_content'>
          <h3>{data?.name}</h3>
        </div>
        <div className='reciverMobile_content_info_location'>
          <Image
            alt='location'
            src={`${api}/[all]_pinLocation.svg`}
            width={13.5}
            height={15}
          />
          <p>{data?.package.locationName}</p>
        </div>
        <div className='reciverMobile_Content_info_capacity'>
          <div className='info_capacityContent'>
            <Image
              alt='persons'
              src={`${api}/[all]_grup.svg`}
              width={15}
              height={8}
            />
            <p>Para {data?.package.paxNumber} personas</p>
          </div>
        </div>
        <div className='reciverMobile_Content_info_code'>
          <p>
            Código del regalo:{' '}
            <span style={{ color: '#ed8067', fontWeight: '500' }}>
              23BB25E9
            </span>
          </p>
        </div>
        <h3 className='reciverMobile_section_price'>{price}</h3>
        <div className='reciverMobile_section_btn'></div>
        <div
          style={{
            borderBottom: '2px solid rgba(196, 196, 196, 0.3)',
            margin: '20pt 0 30pt 0',
          }}
        ></div>
      </section>
    </main>
  );
}
