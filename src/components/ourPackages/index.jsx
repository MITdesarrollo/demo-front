'use client';

import { useSelector } from 'react-redux';
import UniqueCategory from '../category';

import './styless.scss';

export default function OurPackages() {
  const categoryList = useSelector((state) => state.counter.categories);

  return (
    <main className='packages'>
      <div className='ourPackages'>
        <p className='titlePackage'>REGALÁ MOMENTOS INOLVIDABLES</p>
        <h1 className='subTitlePackage'>Descubrí nuestros paquetes</h1>
      </div>
      <div className='allPackages'>
        {categoryList.map((item, index) => (
          <UniqueCategory data={item} key={index} index={index} />
        ))}
      </div>
    </main>
  );
}
