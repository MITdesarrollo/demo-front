import Image from 'next/image';

import './styless.scss';

export default function RegisterSuccess({ onClose }) {
  const api = process.env.apiImages;

  return (
    <main className='backdrop'>
      <main className='registerSuccess'>
        <section className='successSection'>
          <Image
            src={`${api}/[state]_registerSuccess.svg`}
            alt='register_success'
            width={38.55}
            height={38.63}
          />
          <h1 className='successTitle'>¡Felicitaciones!</h1>
          <h3 className='successSubTitle'>
            Tu cuenta se ha creado de manera exitosa.
          </h3>
          <button className='btnRadien' onClick={onClose}>
            Continuar
          </button>
        </section>
      </main>
    </main>
  );
}
