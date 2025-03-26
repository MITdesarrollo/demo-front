import { useEffect, useState } from 'react';
import FilterCard from '@/components/filterCard';
import { GetRelatedPackagesId } from '@/redux/feature/counterApi';

import './styles.scss';

export default function AlsoLike({ packageId, isBigTittle }) {
  const [list, setList] = useState([]);
  const [posts, setPosts] = useState([]); // -> check function (endPoint)

  useEffect(() => {
    const fetchData = async () => {
      if (!packageId) {
        return;
      }
      try {
        const result = await GetRelatedPackagesId(packageId);
        if (result === undefined) {
          return setList([]);
        }
        setList(result);
      } catch (error) {
        console.error('Error fetching related packages:', error);
      }
    };

    fetchData();
  }, [packageId]);

  // -> Update list after set favorite package
  const updatePostList = (index, updatedItem) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      newPosts[index] = updatedItem;
      return newPosts;
    });
  };
  // <-

  return (
    <main className='alsoLike'>
      <section>
        {isBigTittle ? (
          <h1 className='alsoLike_title01'>También te puede gustar</h1>
        ) : (
          <h2 className='alsoLike_title02'>También te puede gustar…</h2>
        )}
      </section>
      <div className='alsoLike_maybe'>
        {list === undefined
          ? null
          : list?.map((item, index) => (
              <FilterCard
                key={index}
                img={item.Image}
                nombre={item.Name}
                destino={item.LocationName}
                personas={item.PaxNumber}
                Price={item.Price}
                like={item.Like}
                id={item.Id}
                quantity={item.Quantity}
                onUpdatePost={(updatedItem) =>
                  updatePostList(index, updatedItem)
                }
              />
            ))}
      </div>
    </main>
  );
}
