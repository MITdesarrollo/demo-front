import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function SliceGiver() {
  const api = process.env.apiImages;
  const imageUrl = `${api}/[giver]_slice.png`;
  const imageMobileUrl = `${api}/[giver]_sliceMobilex2.png`;

  const isWindowDefined = typeof window !== 'undefined';
  const windowWidth = isWindowDefined ? window.innerWidth : 0;

  const bgBanner = {
    backgroundImage: `url(${windowWidth < 768 ? imageUrl : imageMobileUrl})`,
  };

  return (
    <main className='sliceGiver' style={bgBanner}>
      <div className='sliceInfoGiver'>
        <div className='infoInsideSliceGiver'>
          <p className='titleGiver'>LUXURY GIFTS</p>
          <h1 className='titleSliceGiver'>
            Las mejores experiencias en un solo lugar
          </h1>
          <p className='subTitleSliceGiver'>
            En Dreamon nos esforzamos para brindar sólo experiencias de lujo
            para los clientes más exigentes.
          </p>
        </div>
        <div className='arrowDownGiver'>
          <FontAwesomeIcon className='arrowDown' icon={faChevronDown} />
        </div>
      </div>
    </main>
  );
}
