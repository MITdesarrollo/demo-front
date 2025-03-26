import Image from 'next/image';

import './styless.scss';

export default function UserAlreadyExist({ onClose }) {
  const api = process.env.apiImages;

  return (
    <main className='backdrop'>
      <main className='registerSuccess'>
        <section className='successSection'>
          <h1 className='successTitle'>Ocurrió un error</h1>
          <h3 className='successSubTitle'>
            Error al registrar el usuario.
          </h3>
          <button className='btnRadien' onClick={onClose}>
            Continuar
          </button>
        </section>
      </main>
    </main>
  );
}
