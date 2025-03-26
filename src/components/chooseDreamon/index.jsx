import Image from 'next/image';

import './styles.scss';
import { useRouter } from 'next/navigation';

export default function ChooseDreamon() {
  const router = useRouter();
  const api = process.env.apiImages;

  return (
    <main className='choseDreamon'>
      <div className='insideSlice'>
        {window.innerWidth <= 768 ? null : (
          <div className='sliceImage'>
            <Image
              src={`${api}/regalosExperiencias.png`}
              alt='experience'
              width={391}
              height={563}
            />
          </div>
        )}
        <div className='sliceContent'>
          <div className='content'>
            <h3 className='titleContent'>CUMPLIMOS SUEÑOS</h3>
            <h4 className='subTitleContentHome'>
              Porque el mejor regalo es una experiencia inolvidable
            </h4>
            <p className='infoContentHome'>
              En <strong>Dreamon </strong> transformamos los sentimientos de aquellos que buscan
              obsequiar algo especial, en <strong> experiencias</strong> que valen la pena vivir.
            </p>
            <button className='btnContent' onClick={() => router.push('/nosotros')}>Sobre Nosotros</button>
          </div>
        </div>
        {window.innerWidth <= 768 ? (
          <div className='sliceImage'>
            <Image
              src={`${api}/[home]_regalaExperiencia_mobilex2.png`}
              alt='experience'
              width={341}
              height={489}
            />
          </div>
        ) : null}
      </div>
      <div className='choseTitle'>
        <h3 className='titleContent'>
          EL MUNDO ESTÁ LLENO DE EXPERIENCIAS ÚNICAS
        </h3>
        <h1 className='subTitleContentChose'>Elegí un Dreamon</h1>
      </div>
    </main>
  );
}
