import Link from 'next/link';

import './styles.scss';

export default function FooterSecond() {
  return (
    <main className='footerSecond'>
      <p>
        Copyrights © {(new Date()).getFullYear()} All Rights Reserved by{' '}
        <Link href='/' className='linkDreamon'>
          dreamon
        </Link>
      </p>
      <p>Created by BigSur Branding</p>
    </main>
  );
}
