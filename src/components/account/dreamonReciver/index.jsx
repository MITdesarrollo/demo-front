import Image from 'next/image';
// import formatDateString from '@/utils/utils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload, faRetweet } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function DreamonReciverCard({ data }) {
  const api = process.env.apiImages;

  const confirm = () => {
    if (data.dreamOnStatusId === 4) {
      return <span style={{ color: '#21c14b' }}>Confirmado</span>;
    }
    return <span style={{ color: '#ff3636' }}>Pendiente</span>;
  };

  // const formattedDateString = formatDateString();

  return (
    <main className='dreamonReciver'>
      <section className='dreamonReciver_section'>
        <Image
          className='dreamonReciver_image'
          src={data?.package?.image}
          alt='image_dreamon'
          width={220.11}
          height={134.31}
        />
        <section className='dreamonReciver_info'>
          <h3 className='dreamonReciver_info_title'>{data?.name}</h3>
          <div className='dreamonReciver_info_location'>
            <Image
              alt='location'
              src={`${api}/[all]_pinLocation.svg`}
              width={13.5}
              height={15}
            />
            <p>{data?.package?.locationName}</p>
          </div>
          <div className='dreamonReciver_info_capacity'>
            <Image
              alt='persons'
              src={`${api}/[all]_grup.svg`}
              width={15}
              height={8}
            />
            <p style={{ width: '106.19px' }}>
              Para {data?.package?.paxNumber} personas
            </p>
          </div>
          <div className='dreamonReciver_info_calendary'>
            <Image
              src={`${api}/[icon]_calendary.svg`}
              width={16}
              height={12}
              alt='calendar'
            />
            <p>
              Válido hasta:{' '}
              <span style={{ fontWeight: '500' }}>{data?.validUntil}</span>
            </p>
          </div>
          <div className='dreamonReciver_info_gift'>
            <p style={{ fontWeight: '500' }}>
              Código del regalo:{' '}
              <span style={{ color: '#ed8067' }}>{data?.code}</span>
            </p>
          </div>
          {/* <div className='dreamonReciver_info_interactive'>
            <div className='interactive'>
              <FontAwesomeIcon
                className='interactive_icon'
                icon={faDownload}
                style={{ height: '10px' }}
              />
              <p>Descargar</p>
            </div>
            <div className='interactive'>
              <FontAwesomeIcon
                className='interactive_icon'
                icon={faRetweet}
                style={{ height: '10px' }}
              />
              <p>Compartir</p>
            </div>
          </div> */}
        </section>
        <div className='dreamonReciver_btn'>
          <p>{confirm()}</p>
          {/* <button style={{ width: '180px' }} className='btnRadien'>
            Cambiar experiencia
          </button> */}
        </div>
      </section>
    </main>
  );
}
