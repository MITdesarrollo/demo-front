import Image from 'next/image';
import { formatCurrency } from '@/utils/utils';

import './styles.scss';

const StatusDisplay = ({ status = {} }) => {
  const { id, name } = status;
  const color = id === 3 ? '#21c14b' : '#ff3636';
  return <span style={{ color }}>{name}</span>;
};

export default function GiftMade({ data, hideQuantity = false }) {
  const api = process.env.apiImages;
  const price = formatCurrency(data?.package.price);

  return (
    <main className="GiftMade">
      <section className="GiftMade_Content">
        <Image
          className="GiftMade_Content_image"
          src={data?.package.image}
          alt="image_dreamon"
          width={220.11}
          height={134.31}
        />
        <section className="GiftMade_Content_info">
          <div>
            <div className="GiftMade_Content_info_title">
              <h3>{data?.name}</h3>
              <p>
                <StatusDisplay status={data?.dreamOnStatus} />
              </p>
            </div>
            <div className="GiftMade_Content_info_location">
              <Image
                alt="location"
                src={`${api}/[all]_pinLocation.svg`}
                width={13.5}
                height={15}
              />
              <p>{data?.package.locationName}</p>
            </div>
            <div className="GiftMade_Content_info_capacity">
              <Image
                alt="persons"
                src={`${api}/[all]_grup.svg`}
                width={15}
                height={8}
              />
              <p style={{ width: '106.19px' }}>
                Para {data?.package.paxNumber} personas
              </p>
              {!hideQuantity && (
                <p className="GiftMade_Content_info_amount">
                  Cantidad: {data?.package.quantity}
                </p>
              )}
            </div>
          </div>
          <section className="GiftMade_Content_info_set">
            <div className="GiftMade_Content_set">
              <h3 className="GiftMade_Content_info_price" style={{ fontWeight: '500'}}>{price}</h3>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
