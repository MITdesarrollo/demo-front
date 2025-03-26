import Image from 'next/image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function ContentInfoSection({ data }) {
  const [viewInfo, setViewInfo] = useState(false);

  const api = process.env.apiImages;

  function processDescription(inputString) {
    return inputString.replace(/\n$/, '.');
  }

  return (
    <main className='contenInfoSection'>
      <div className='sectionInfo'>
        <div className='sectionInfo_left'>
          <Image
            src={data.icon}
            alt='importanInformation'
            width={20.06}
            height={20.06}
          />
          <p className='sectionInfo_title'>{data.title}</p>
        </div>
        <FontAwesomeIcon
          icon={!viewInfo ? faChevronDown : faChevronUp}
          style={{ cursor: 'pointer' }}
          onClick={() => setViewInfo(!viewInfo)}
        />
      </div>
      {viewInfo ? (
        <>
          <div className='markdown' style={{ marginBottom: '30px' }}>
            <ReactMarkdown escape={false}>
              {processDescription(data.content)}
            </ReactMarkdown>
          </div>
          <div>
            {data.latitude && data.longitude && (
              <iframe
                width='425'
                height='350'
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.longitude}%2C${data.latitude}&amp;layer=mapnik`}
                style={{ border: '1px solid black', marginBottom: '30px' }}
              ></iframe>
            )}
          </div>
        </>
      ) : null}
    </main>
  );
}
