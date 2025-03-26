import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function BannerHome() {
  const api = process.env.apiImages;

  const image = `${api}/[home]_banner.png`;
  const imageMobile = `${api}/[home]_bannerx2_mobile.png`;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const imagebanner = isMobile ? imageMobile : image;

  const bannerProps = [
    {
      imageUrl: imagebanner,
      title:
        '“La experiencia Dreamon superó todas mis expectativas. Un regalo de lujo, que creó recuerdos inolvidables. ¡Gracias!”',
      author: 'Lucía Furcade',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Elegir Dreamon fue la mejor decisión. Cada detalle fue perfecto, desde la presentación hasta la experiencia misma. ¡Mi hija no lo olvidará nunca!”',
      author: 'Martín Deniard',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Dreamon transformó un simple regalo en una aventura de lujo. La atención personalizada y la calidad de la experiencia fueron excepcionales.”',
      author: 'Sofía Martínez',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Increíble servicio y experiencias inolvidables. Dreamon realmente sabe cómo hacer sentir especial a alguien. ¡Una experiencia que volveré a repetir!”',
      author: 'Eduardo Hansen',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Dreamon me ayudó a encontrar el regalo perfecto, creando un momento mágico. ¡Una experiencia que mi esposo y yo nunca olvidaremos!”',
      author: 'Carla Zunino',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Dreamon hizo realidad mi sueño de regalar una escapada perfecta. Su atención al detalle y servicio personalizado fueron de primera clase. ¡Una experiencia excepcional!”',
      author: 'Diego Torres',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Dreamon ha elevado el arte de regalar a un nuevo nivel. Cada aspecto de su servicio fue impecable y personalizado. Me dejaron completamente impresionado.”',
      author: 'Gonzalo Orozco',
    },
    {
      imageUrl: imagebanner,
      title:
        '“Elegir Dreamon para celebrar nuestro compromiso fue la decisión más acertada. Crearon un ambiente romántico y único que nunca olvidaremos. ¡Gracias, Dreamon!”',
      author: 'Valeria Idiazabal',
    },
  ];

  const [apiData, setApiData] = useState(bannerProps);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const apiResponse = await fetch('tu_url_de_api'); // Reemplaza con tu URL de API real
        // const data = await apiResponse.json();
        // setApiData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % apiData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? apiData.length - 1 : prevIndex - 1
    );
  };

  const { imageUrl, title, author } = apiData[currentIndex];

  const bgBanner = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <main className='bannerHome' style={bgBanner}>
      <FontAwesomeIcon
        className='iconSliceArrow'
        icon={faChevronLeft}
        style={{ color: 'white', cursor: 'pointer' }}
        onClick={handlePrev}
      />
      <div className='bannerContent'>
        <h3 className='contentTitleBanner'>{title}</h3>
        <h2 className='contentAutorBanner'>{author}</h2>
      </div>
      <FontAwesomeIcon
        className='iconSliceArrow'
        icon={faChevronRight}
        style={{ color: 'white', cursor: 'pointer' }}
        onClick={handleNext}
      />
    </main>
  );
}
