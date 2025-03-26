import { useState } from 'react';
import FooterContentDown from '../components/contentDown';
import Image from 'next/image';

import './styles.scss';

export default function FooterMobile({ footerInfo }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const logoDreamon = process.env.apiLogoMedium;

  const handleToggleInfo = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredFooterInfo = footerInfo.filter((data) => data.name !== '');

  return (
    <main className='footerMobile'>
      <section className='footerMobile_logo'>
        <Image
          src={logoDreamon}
          alt='logoDreamon'
          width={166}
          height={26.77}
          style={{ margin: '16px 0px' }}
        />
        <p>Make it happen</p>
      </section>
      {filteredFooterInfo.map((data, index) => (
        <FooterContentDown
          data={data}
          key={index}
          index={index}
          isExpanded={expandedIndex === index}
          onToggleInfo={handleToggleInfo}
        />
      ))}
    </main>
  );
}
