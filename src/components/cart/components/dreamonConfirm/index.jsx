import Image from 'next/image';

import './styles.scss';
import { formatCurrency } from '@/utils/utils';

export default function DreamonConfirm({ data }) {
  const api = process.env.apiImages;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const price = formatCurrency(data.package.price);
  const formattedDate = formatDate(data.package.endDate);

  return (
    <main className='dreamonConfirm'>
      <section className='dreamonConfirm_section'>
        <Image
          src={data.package.image}
          alt='img-package'
          width={
            window !== 'undefined' && window.innerWidth <= 768 ? 221.42 : 260
          }
          height={
            window !== 'undefined' && window.innerWidth <= 768 ? 137.18 : 161
          }
        />
        <div className='dreamonConfirm_content'>
          <h2 style={{ fontWeight: 500 }}>{data.package.name}</h2>
          <div className='dreamonConfirm_content_info'>
            <Image
              alt='location'
              src={`${api}/[all]_pinLocation.svg`}
              width={13.5}
              height={15}
            />
            <p style={{ color: '#ed8067' }}>{data.package.locationName}</p>
          </div>
          <div className='dreamonConfirm_content_info'>
            <Image
              alt='persons'
              src={`${api}/[all]_grup.svg`}
              width={15}
              height={8}
            />
            <p>Para {data.package.paxNumber} personas</p>
          </div>
          <section className='dreamonConfirm_content_section'>
            <div className='dreamonConfirm_content_info'>
              <Image
                alt='location'
                src={`${api}/[icon]_calendary.svg`}
                width={13.5}
                height={15}
              />
              <p>
                Válido hasta:{' '}
                <span style={{ fontWeight: '500' }}>{formattedDate}</span>
              </p>
            </div>
            <p className='dreamonConfirm_price'>{price}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
