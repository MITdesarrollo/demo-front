import VideoIntroduction from '@/components/videoIntroduction';

import './styles.scss';

export default function HeaderAboutUs() {
  const imageUrl = `images/[aboutus]_image_background.png`;
  const bgBanner = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <main className="headerAboutUsContainer" style={bgBanner}>
      <div className="headerAboutUsContainerInfo">
        <div className="aboutusInsideSlice">
          <h2 className="textOne">Crea una cultura generosa</h2>
          <p className="textTitle">Make it happen</p>
          <p className="subText">
            En Dreamon creemos que regalar es tan importante como recibir. Esto
            es lo que crea una cultura que se nutre de la generosidad y las{' '}
            <b>emociones duraderas</b>.
          </p>
          <VideoIntroduction />
        </div>
      </div>
    </main>
  );
}
