import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FilterCard from '../filterCard';
import { GetFilterPackages } from '@/redux/feature/counterApi';
import AlsoLike from '../cart/components/alsoLike';

import './styless.scss';

export default function PopUpCart({ close, data, quantity }) {
  const api = process.env.apiImages;
  const router = useRouter();

  const btnSelect = () => {
    router.push('/cart');
  };

  const btnNav = () => {
    router.push('/search');
  };

  // ->
  const [posts, setPosts] = useState([]);
  const [request, setRequest] = useState({
    regionIds: [-1],
    countryIds: [-1],
    categoryIds: [-1],
    ideasIds: [-1],
    minPrice: 0,
    maxPrice: 100000,
    index: 1,
    offset: 3,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetFilterPackages(request);
      setPosts(res);
    };

    fetchData();
  }, [request]);
  

  return (
    <main className='popup'>
      <main className='popupCart'>
        <div className='popupCart_addCart'>
          <div className='popupCart_addCart_title'>
            <div className='popupCart_addCart_title_header'>
              <Image
                alt='done_add'
                src={`${api}/[popup]_done.svg`}
                width={22}
                height={22}
              />
              <h3>Añadido al carrito</h3>
            </div>
            <Image
              alt='close'
              src={`${api}/[popup]_close.svg`}
              width={22}
              height={22}
              onClick={close}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className='popupCart_addCart_content'>
            <Image
              className='popupCart_addCart_content_image'
              src={data.image}
              alt='image_dreamon'
              width={263.12}
              height={169.37}
            />
            <div className='popupCart_addCart_content_info'>
              <h3>{data.name}</h3>
              <div className='popupCart_addCart_content_info_location'>
                <Image
                  alt='location'
                  src={`${api}/[all]_pinLocation.svg`}
                  width={13.5}
                  height={15}
                />
                <p>{data.locationName}</p>
              </div>
              <div className='popupCart_addCart_content_info_texts'>
                <div className='popupCart_addCart_content_info_capacity'>
                  <Image
                    alt='persons'
                    src={`${api}/[all]_grup.svg`}
                    width={15}
                    height={8}
                  />
                  <p>Para {2} personas</p>
                </div>
                <p className='popupCart_addCart_content_info_amount'>
                  Cantidad: {quantity}
                </p>
              </div>
              <div className='popupCart_addCart_content_info_btns'>
                <button
                  className='popupCart_addCart_content_info_btns_01'
                  onClick={btnNav}
                >
                  Seguí navegando
                </button>
                <button
                  className='popupCart_addCart_content_info_btns_02'
                  onClick={btnSelect}
                >
                  Completar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
        {posts.length > 0 ? <AlsoLike packageId={data.id} /> : null}
      </main>
    </main>
  );
}
