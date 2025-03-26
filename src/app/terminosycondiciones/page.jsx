'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { tycContent, tycHeader } from '@/utils/tyc.Content';
import ClubVip from '@/components/clubVip';

import './styles.scss';

export default function TerminosCondiciones() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <main className='tyc'>
      <section className='tyc_content'>
        <section className='tyc_content_header'>
          <h1 className='tyc_content_header_title'>Términos y Condiciones</h1>
          <div
            className='tyc_faq_info'
            dangerouslySetInnerHTML={{
              __html: tycHeader,
            }}
          />
        </section>
        <section>
          <h1
            className='tyc_content_header_title'
            style={{ marginTop: '100px' }}
          >
            Tabla de contenido
          </h1>
          <div>
            {tycContent.map((cont, index) => (
              <div className='tyc_faq' key={index}>
                <div className='tyc_faq_content'>
                  <div className='tyc_faq_content_left'>
                    <p className='tyc_faq_title'>{cont.title}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={expandedIndex === index ? faChevronUp : faChevronDown}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleToggle(index)}
                  />
                </div>
                {expandedIndex === index ? (
                  <div
                    className='tyc_faq_info'
                    dangerouslySetInnerHTML={{
                      __html: cont.content,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </section>
      <ClubVip />
    </main>
  );
}
