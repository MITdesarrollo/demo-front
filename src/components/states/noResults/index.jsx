import Image from 'next/image';
import { noop } from '@/utils/utils'; 

import './styless.scss';

export default function NoResults({ onFilterClear = noop, currentPage }) {
  const api = process.env.apiImages;

  return (
    <main className='noResults'>
      <Image
        alt='no results'
        src={`${api}/[state]_noResults.svg`}
        width={117.59}
        height={78.5}
      />
      <h1 className='noResults_title'>Sin resultados</h1>
      <p className='noResults_subTitle'>
        No se encontraron resultados para los parámetros de búsqueda
        solicitados.
      </p>
      <button
        className='btnRadien'
        style={{ width: '204px', marginTop: '43.45px' }}
        onClick={onFilterClear}
      >
        Iniciar nueva búsqueda
      </button>
    </main>
  );
}
