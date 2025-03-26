import Image from 'next/image';
import './styles.scss';

export default function Blog() {
  const blogContent = [
    {
      img: '/01X2.png',
      title: 'Las experiencias de lujo ganan adeptos en todo el mundo',
      info: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa…',
    },
    {
      img: '/02X2.png',
      title: '¿Cómo cuidarse en el viaje en tiempos de pandemia?',
      info: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa…',
    },
    {
      img: '/03X2.png',
      title: '¿Cuales son los 10 destinos más exclusivos del mundo?',
      info: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa…',
    },
  ];
  return (
    <main className='blog'>
      <div className='blogContentTitle'>
        <h1 className='blogTitle'>Blog</h1>
        <button className='blogButton'>Visita nuestro blog</button>
      </div>
      <div className='blogContent'>
        {blogContent.map((item, index) => (
          <main key={index}>
            <div key={index} className='contentMap'>
              <Image
                src={item.img}
                alt='Image'
                width={352}
                height={352 / 1.6}
              />
              <h2 className='titleContentMap'>{item.title}</h2>
              <p className='infoContentMap'>{item.info}</p>
            </div>
            <div className='btn'>
              <button className='btnContentMap'>Leer más</button>
            </div>
          </main>
        ))}
      </div>
    </main>
  );
}
