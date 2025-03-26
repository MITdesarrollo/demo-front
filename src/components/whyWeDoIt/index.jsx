import Image from 'next/image';

import './styles.scss';

export default function WhyWeDoIt() {
  return (
    <main
      className="whyWeDoItContainer"
      style={{
        backgroundColor: '#F7F7F7',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 1,
      }}
    >
      <div className="insideSlice">
        <div className="sliceImage">
          <Image
            src={`/images/[aboutus]_hug.png`}
            alt="experience"
            width={480}
            height={322}
          />
        </div>
        <div className="sliceContent">
          <div className="content">
            <h3 className="titleContentWhy">LO QUE NOS MUEVE</h3>
            <h1 className="subTitleContentWhy">¿Por qué lo hacemos?</h1>
            <p className="infoContentWhy">
              Porque creemos que el mejor regalo es aquel que se hace pensando
              en el que lo va a recibir; cuidando cada detalle y que se note;
              dejando una huella profunda en el corazón que lo recibe.
            </p>
            <p className="infoDosWhy">
              Por eso, nuestro propósito es llenar los corazones de momentos
              memorables.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
