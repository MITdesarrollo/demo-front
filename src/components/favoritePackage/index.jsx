import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '@/utils/utils';
import { useSelector } from 'react-redux';
import { SetFavorityPackage } from '@/redux/feature/counterApi';
import AddCartButton from '@/components/addCartButton';

import './styles.scss';

export default function FavoritePackage({ data }) {
  const api = process.env.apiImages;

  const userInfo = useSelector((state) => state.counter?.user?.info);
  const dreamerId =
    userInfo?.[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  const [packageInfo, setPackageInfo] = useState({
    ...data,
    // FIXME: from backend return like: false. if exists here on load time the like should be true
    like: true,
  });

  const price = formatCurrency(data.price);

  const unLike = async () => {
    try {
      // optimistic update
      setPackageInfo({ ...packageInfo, like: false });
      await SetFavorityPackage(data?.id, dreamerId, false);
    } catch (error) {
      console.log(error);
      setPackageInfo({ ...packageInfo, like: true });
    }
  };

  const like = async () => {
    try {
      // optimistic update
      setPackageInfo({ ...packageInfo, like: true });
      await SetFavorityPackage(data?.id, dreamerId, true);
    } catch (error) {
      console.log(error);
      setPackageInfo({ ...packageInfo, like: false });
    }
  };

  return (
    <main className='favoritePackage'>
      <section className='favoritePackage_content'>
        <Image
          src={data.image}
          alt='img_pacakge'
          width={220.11}
          height={134.31}
        />
        <section className='favoritePackage_info'>
          <div>
            <h2 className='favoritePackage_title'>{data.name}</h2>
            <div className='favoritePackage_info_package'>
              <Image
                alt='location'
                style={{ marginRight: '8px' }}
                src={`${api}/[all]_pinLocation.svg`}
                width={13.5}
                height={15}
              />
              <p className='favoritePackage_location'>{data.locationName}</p>
            </div>
            <div className='favoritePackage_info_package'>
              <Image
                alt='persons'
                style={{ marginRight: '8px' }}
                src={`${api}/[all]_grup.svg`}
                width={15}
                height={8}
              />
              <p className='favoritePackage_persons'>
                Para {data.paxNumber} personas
              </p>
            </div>
          </div>
          <div className='favoritePackage_selectOptions'>
            <h3 className='favoritePackage_selectOptions_mx'>
              Cantidad Máx 20
            </h3>
            <div className='favoritePackage_selectCant'>
              <p># : ##</p>
            </div>
            <p className='favoritePackage_price'>{price}</p>
            <FontAwesomeIcon
              icon={packageInfo?.like ? solidHeart : regularHeart}
              style={{ color: '#ed8067', cursor: 'pointer' }}
              onClick={packageInfo?.like ? unLike : like}
            />
          </div>
        </section>
        <section className='favoritePackage_btn'>
          <AddCartButton data={data} packageId={data?.id} quantity={1} />
        </section>
      </section>
    </main>
  );
}
