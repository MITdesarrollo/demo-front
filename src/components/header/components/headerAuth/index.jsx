'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

import './styles.scss';

export default function HeaderAuth() {
  const logoDreamon = process.env.apiLogoMedium;
  const router = useRouter();

  return (
    <main className='headerAuth'>
      <div className='headerContent' onClick={() => router.back()}>
        <FontAwesomeIcon
          className='backHome'
          icon={faChevronLeft}
          onClick={() => router.push('/')}
        />
        {window.innerWidth < 768 ? (
          <div className='logoDreamon'>
            <Image
              alt='logoDreamon'
              src={logoDreamon}
              width={168}
              height={27.09}
            />
          </div>
        ) : null}
        {window.innerWidth > 768 ? <h3 className='headerTitle'>Volver</h3> : null}
      </div>
    </main>
  );
}
