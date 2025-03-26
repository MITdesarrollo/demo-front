'use client';

import Link from 'next/link';
import FooterSecond from '../footerSecond';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import './styles.scss';
import FooterMobile from './footerMobile';

import { FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK } from '@/utils/constants';

export default function Footer() {
  const footerInfo = [
    {
      name: 'dreamon',
      info: [
        { info: 'make it happen' },
        { info: 'Dirección' },
        { info: 'Av. Juramento 1805, C1428 CABA' },
        { info: '+54-011-5256-5050' },
        { info: 'info@dreamon.gift' },
      ],
    },
    {
      name: '',
      info: [{ info: '', link: '/' }],
    },
    // {
    //   name: 'corporativo',
    //   info: [{ info: 'regalos corporativos', link: '/' }],
    // },
    {
      name: 'ayuda y soporte',
      info: [
        { info: 'contacto', link: '/contacto' },
        { info: 'preguntas frecuentes', link: '/faq' },
      ],
    },
    {
      name: 'top links',
      info: [
        { info: 'sobre nosotros', link: '/nosotros' },
        { info: 'Regalá un Dreamon', link: '/search' },
      ],
    },
    {
      name: 'seguinos',
      info: [
        { info: 'Facebook', link: FACEBOOK_LINK },
        { info: 'Instagram', link: INSTAGRAM_LINK },
        { info: 'LinkedIn', link: LINKEDIN_LINK },
      ],
    },
  ];

  const pathname = usePathname();
  const resetPasswordRegex = /^\/auth\/resetPassword\/\w+\/?$/;
  const pathNameResetPass = resetPasswordRegex.test(pathname);

  const pathName = pathname === '/auth' || pathNameResetPass === true;
  const api = process.env.apiImages;
  const imgDreamon = `${api}/[header]_logoDreamon.png`;
  const router = useRouter();

  const list = footerInfo.map((obj, index) => {
    const name = obj.name;
    const info = Object.keys(obj)[1];
    const content = obj[info];
    const href = obj.info.link || '/';

    const elements = content.map((item, infoIndex) => (
      <li
        className={`infoText ${
          name === 'dreamon' &&
          (infoIndex === 0 || infoIndex === 2 || infoIndex === 4)
            ? 'withBorder'
            : ''
        }`}
        key={infoIndex}
      >
        {/* <li className='infoText' key={infoIndex}> */}
        {item.link ? (
          <Link
            href={item?.link || '/'}
            className={`linkText ${infoIndex === 4 && 'lowercase'}`}
          >
            {item.info}
          </Link>
        ) : (
          <p className={`linkText ${infoIndex === 4 && 'lowercase'}`}>
            {item.info}
          </p>
        )}
      </li>
    ));

    return (
      <div key={index} className='footerInfo'>
        <h2 className='title'>
          {name === 'dreamon' ? (
            <Image
              src={imgDreamon}
              alt='logo Dreamon'
              width={119.94}
              height={19.34}
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            name
          )}
        </h2>

        <ul>{elements}</ul>
      </div>
    );
  });

  return (
    <>
      {pathName ? null : (
        <main>
          {window.innerWidth <= 768 ? (
            <FooterMobile footerInfo={footerInfo} />
          ) : (
            <div className='footer'>{list}</div>
          )}
          <FooterSecond />
        </main>
      )}
    </>
  );
}
