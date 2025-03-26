import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { noop } from '@/utils/utils';
import { FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK } from '@/utils/constants';

import './styless.scss';

export default function Menu({ menuContent, toggleMenu = noop }) {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(false);

  const logoDreamonMedium = process.env.apilogoBlack;
  // const apiImage = process.env.apiImages;

  return (
    <>
      <main className='headerMenu'>
        <Image
          src={logoDreamonMedium}
          alt='logoDreamon'
          height={27}
          width={168}
        />
        <div className='menuList'>
          {menuContent.map((item, index) => (
            <main key={index} className='menuListItem'>
              <li
                className={`menuItem ${hoveredItem === index ? 'hovered' : ''}`}
                key={index}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(false)}
                onClick={() => {
                  if (item?.path) {
                    router.push(item?.path);
                    toggleMenu();
                  }
                }}
              >
                {item.menu}
                {hoveredItem === index && (
                  <ul className='subMenu'>
                    <div className='subMenuItem'>
                      {item.subMenu?.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className='subItems'
                          onClick={() => {
                            router.push(subItem?.path);
                            toggleMenu();
                          }}
                        >
                          {subItem.name}
                        </li>
                      ))}
                    </div>
                  </ul>
                )}
              </li>
            </main>
          ))}
        </div>
        <div className='footerMenu'>
          <p style={{ color: '#262633' }}>
            Copyrights © {(new Date()).getFullYear()} All Rights Reserved by{' '}
            <span style={{ color: '#ecbf52', cursor: 'pointer' }}>Dreamon</span>
          </p>
          <p className='followMenu' style={{ color: '#262633' }}>
            <span>Seguinos</span>
            <span><a href={FACEBOOK_LINK} target='_blank'>Facebook</a> |</span>
            <span><a href={INSTAGRAM_LINK} target='_blank'>Instagram</a> |</span>
            <span><a href={LINKEDIN_LINK} target='_blank'>LinkedIn</a></span>
          </p>
        </div>
      </main>
      {/* <main className='menuBackground'>
        <Image
          src={`${apiImage}/[menu]_romanBackground.png`}
          alt='backgroundImage'
          sizes='width: 50vw, height: auto'
          fill
        />
      </main> */}
    </>
  );
}
