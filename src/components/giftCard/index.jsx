import Image from 'next/image';

import './styles.scss';

export default function GiftCardHome() {
  return (
    <main className='giftCardHome'>
      <div className='giftCardInfo'>
        <div className='content'>
          <h3 className='titleContent'>GIFT CARD DREAMON</h3>
          <h1 className='subTitleContent'>¿No sabés qué regalar?</h1>
          <p className='infoContent'>
            Regalá una Gift Card Dreamon y que tu agasajado decida qué
            experiencia quiere vivir. Podrás elegir que le llegue en forma
            virtual o en nuestras exclusivas Dreamon Box.
          </p>
          <button className='btnContent'>Regalá una Gift Card</button>
        </div>
      </div>
      <div className='giftCardImg'>
        <Image
          src='/giftCardX2.png'
          alt='Gift Card'
          width={783.43}
          height={584.99}
        />
      </div>
    </main>
  );
}
