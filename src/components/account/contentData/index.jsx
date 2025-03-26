import DreamonReciverCard from '../dreamonReciver';
import GiftMade from '../giftMade';

import './styles.scss';

export default function UserReciverAndGiver({ dreamonReciver, dreamonGiver }) {
  return (
    <main className='accountPage_content_allData'>
      <section className='allData'>
        <h3 className='allData_title'>Regalos realizados</h3>
        {dreamonGiver?.length > 0 ? (
          dreamonGiver.map((item, index) => (
            <>
              <GiftMade key={index} data={item} hideQuantity={true} />
              <div
                style={{
                  borderBottom: '2px solid rgba(196, 196, 196, 0.3)',
                  margin: '0 23px',
                }}
              ></div>
            </>
          ))
        ) : (
          <section className='allData_reciverSection'>
            <h3>¿Todavía no hiciste ningún regalo?</h3>
            <button
              className='btnRadien'
              style={{ width: '310px' }}
              onClick={() => router.push('/search')}
            >
              Hacé un regalo
            </button>
          </section>
        )}
      </section>
      <section className='allData'>
        <h3 className='allData_title'>Regalos recibidos</h3>
        {dreamonReciver?.length > 0 ? (
          dreamonReciver.map((item, index) => (
            <DreamonReciverCard key={index} data={item} />
          ))
        ) : (
          <section className='allData_reciverSection'>
            <h3>Todavía no recibiste ningún regalo</h3>
            <button className='btnRadien' style={{ width: '310px' }}>
              Compartí tu lista de deseos
            </button>
          </section>
        )}
        {dreamonReciver?.length > 0 && (
          <div
            style={{
              borderBottom: '2px solid rgba(196, 196, 196, 0.3)',
              margin: '0 23px',
            }}
          ></div>
        )}
      </section>
    </main>
  );
}
