import DreamonReciverMobile from '../dreamonReciverMobile';
import GiftMadeMobile from '../giftMadeMobile';

import './styles.scss';

export default function ReciverAndGiverMobile({
  dreamonReciver,
  dreamonGiver,
}) {
  return (
    <main className='userDataMobile'>
      <section className='userDataMobile_section'>
        <h3
          className='userDataMobile_tittle'
          style={dreamonGiver?.length > 0 ? { margin: '53px 0 30px 0' } : null}
        >
          Regalos realizados
        </h3>
        {dreamonGiver?.length > 0 ? (
          dreamonGiver.map((item, index) => (
            <GiftMadeMobile key={index} data={item} />
          ))
        ) : (
          <section className='userDataMobile_content'>
            <div className='userDataMobile_content_info'>
              <h3>¿Todavía no hiciste ningún regalo?</h3>
            </div>
            <button
              className='btnRadien'
              style={{ width: '310px', height: '40pt', fontSize: '13pt' }}
              onClick={() => router.push('/search')}
            >
              Hacé un regalo
            </button>
          </section>
        )}
      </section>
      <section className='userDataMobile_section'>
        <h3
          className='userDataMobile_tittle'
          style={
            dreamonReciver?.length > 0 ? { margin: '53px 0 30px 0' } : null
          }
        >
          Regalos recibidos
        </h3>
        {dreamonReciver?.length > 0 ? (
          dreamonReciver.map((item, index) => (
            <DreamonReciverMobile key={index} data={item} />
          ))
        ) : (
          <section className='userDataMobile_content'>
            <div className='userDataMobile_content_info'>
              <h3>Todavía no recibiste ningún regalo</h3>
            </div>
            <button
              className='btnRadien'
              style={{ width: '310px', height: '40pt', fontSize: '13pt' }}
            >
              Compartí tu lista de deseos
            </button>
          </section>
        )}
      </section>
    </main>
  );
}
