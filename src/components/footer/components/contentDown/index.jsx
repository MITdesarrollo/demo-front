import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';
import Link from 'next/link';

export default function FooterContentDown(props) {
  const { viewInfo, index, data, isExpanded, onToggleInfo } = props;

  return (
    <main>
      <section className='footerMobile_section'>
        <div className='footerMobile_section_content'>
          <h3>{data.name.toUpperCase()}</h3>
          <div>
            <FontAwesomeIcon
              icon={!isExpanded ? faChevronDown : faChevronUp}
              style={{ color: 'white' }}
              onClick={() => onToggleInfo(index)}
            />
          </div>
        </div>
        {isExpanded ? (
          <div>
            <ul className='footerMobile_ul'>
              {data.info.map((elments, index) => (
                <li className='footerMobile_li' key={index}>
                  {elments.link ? (
                    <Link
                      href={elments.link || '/'}
                      className='footerMobile_linkText linkText'
                    >
                      {elments.info}
                    </Link>
                  ) : (
                    <p className='footerMobile_linkText linkText'>{elments.info}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  );
}
