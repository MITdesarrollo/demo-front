'use client';

import './styles.scss';

import HeaderAboutUs from '@/components/headerAboutUs';
import ClubVip from '@/components/clubVip';
import WhatIsDreamon from '@/components/whatIsDreamon';
import WhyWeDoIt from '@/components/whyWeDoIt';
import Image from 'next/image';

export default function Nosotros() {
  const LOGO_WIDTH = 160;
  return (
    <main style={{ backgroundColor: '#F7F7F7' }}>
      <HeaderAboutUs />
      <WhatIsDreamon />
      <div
        style={{
          position: 'relative',
          backgroundColor: 'red',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          width={LOGO_WIDTH}
          height={LOGO_WIDTH}
          src="/images/[aboutus]_logo.png"
          alt="slice01"
          style={{
            position: 'absolute',
            top: -(LOGO_WIDTH / 2),
          }}
        />
      </div>
      <WhyWeDoIt />
      <ClubVip />
    </main>
  );
}
