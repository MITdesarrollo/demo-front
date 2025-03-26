import Image from 'next/image';

import './styless.scss';

export default function HowToWork() {
  const api = process.env.apiImages;

  const infoSteps = [
    {
      img: `${api}/[giver]_01X2.png`,
      title: 'Buscá el Dreamon que quieras regalar',
      subTitle: 'Sorprendé a tu agasajado con una experiencia inolvidable.',
      // infoExt: '¿No sabes que regalar?',
      // btn: 'Regalá una Gift Card',
    },
    {
      img: `${api}/[giver]_02X2.png`,
      title: 'Contacto',
      subTitle:
        'Completa el formulario y nos pondremos en contacto para acercarte todos los medios de pago.',
    },
    {
      img: `${api}/[giver]_03X3.png`,
      title: 'Coordinar envío',
      subTitle: 'El regalo se puede enviar en forma física o virtual (email).',
    },
  ];

  return (
    <main className='howToWork'>
      <div className='stepByStep'>
        <p className='stepTitle'>PASO A PASO</p>
        <h1 className='stepSubTitle'>¿Cómo funciona?</h1>
        <p className='stepInfoContent'>
          Como siempre decimos, regalar un Dreamon es un deseo que se enciende
          en el corazón de aquel que quiere obsequiar algo especial. Nosotros
          sólo ayudamos a recorrer un camino tan simple como el de seguir estos
          pasos:
        </p>
      </div>


      <div className='threeSteps'>
        {infoSteps.map((item, index) => (
          <div className='stepOne' key={index}>
            <Image alt='Step One' src={item.img} width={248} height={249} />
            <section className='stepsContent'>
              <h3 className='titleStep'>{item.title}</h3>
              <p className='subTitleStep'>{item.subTitle}</p>
              {item.infoExt ? (
                <h3 className='moreInfo'>{item.infoExt}</h3>
              ) : null}
              {item.btn ? <button className='btn'>{item.btn}</button> : null}
            </section>
          </div>
        ))}
      </div>
    </main>
  );
}
