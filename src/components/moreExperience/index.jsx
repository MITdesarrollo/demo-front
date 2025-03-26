import Image from 'next/image';
import { useRouter } from 'next/navigation'

import './styless.scss';

export default function MoreExperience() {
  const api = process.env.apiImages;
  const router = useRouter();
  return (
    <main className='moreExp'>
      <h3 className='moreExp_Title'>¿Queres sumar noches o experiencias?</h3>
      <div className='moreExp_contact'>
        <Image
          src={`${api}/[info]_contactPhone.svg`}
          alt='contact'
          width={13}
          height={13}
        />
        <p className='moreExp_contact_info'>
          <span onClick={() => router.push('/contacto')}>Contactanos</span> y personalizamos tu Dreamon
        </p>
      </div>
      <p className='moreExp_info'>
        *Se puede sumar solo 3 experiencias por cada 5 noches.
      </p>
    </main>
  );
}
