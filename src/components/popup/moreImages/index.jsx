import Image from 'next/image';
import { useState } from 'react';

import './styles.scss';

// Default theme
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function MoreImagePackages({ setViewMore, data }) {
  const [imgSelect, setImgSelect] = useState(data.images[0].imageURL);

  const api = process.env.apiImages;

  return (
    <main className='moreImages'>
      <section className='moreImages_section'>
        <Splide aria-label="My Favorite Images">
          {data.images.map((img, index) => (
            <SplideSlide key={index}>
              <img src={img.imageURL} className="moreImages_img" />
            </SplideSlide>
          ))}
        </Splide>
        <Image
          alt='close'
          src={`${api}/[icon]_closeButton.svg`}
          width={21.95}
          height={21.95}
          className='moreImages_close'
          onClick={() => setViewMore(false)}
        />
      </section>
    </main>
  );
}
