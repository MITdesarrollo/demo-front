import Image from 'next/image';
import { useRouter } from 'next/navigation';

import './styles.scss';

export default function GiftMoments() {
  const router = useRouter();
  const api = process.env.apiImages;

  const imageUrl = `${api}/[home]_giftMoments2x.png`;
  const imageUrlMobile = `${api}/[home]_giftMomentsx2_mobile.png`;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const image = isMobile ? imageUrlMobile : imageUrl;
  const width = isMobile ? 342 : 536;
  const height = isMobile ? 233 : 359.06;

  return (
    <main className='giftMoments'>
      <div className='insideSlice'>
        <div className='sliceImage'>
          <Image src={image} alt='Gift Moments' width={width} height={height} />
        </div>
        <div className='sliceContent'>
          <div className='content'>
            <h3 className='titleContentGift'>LA EXPERIENCIA DREAMON</h3>
            <h1 className='subTitleContentGift'>Regalá momentos únicos</h1>
            <p className='infoContentGift'>
              Un <span style={{ fontWeight: '500' }}>Dreamon</span> empieza en
              el alma y corazón del que regala para luego convertirse en una
              experiencia a medida del agasajado.
            </p>
            <button className='btnContentGift' onClick={() => router.push('/giver')}>Regalá un Dreamon</button>
          </div>
        </div>
      </div>
    </main>
  );
}
