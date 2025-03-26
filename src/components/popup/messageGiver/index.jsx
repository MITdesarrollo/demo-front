import Image from 'next/image';

import './styless.scss';

export default function MessageGiver({ message, setViewMessage, userGiver }) {
  const api = process.env.apiImages;

  return (
    <main className='messageGiver'>
      <section className='messageGiver_section'>
        <Image
          alt='happy'
          src={`${api}/[icon]_happyFace.svg`}
          width={38.44}
          height={38.44}
        />
        <Image
          alt='close'
          src={`${api}/[icon]_closeButton.svg`}
          width={21.95}
          height={21.95}
          className='messageGiver_close'
          onClick={() => setViewMessage(false)}
        />
        <h1>¡{userGiver} te dejó un mensaje!</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}
