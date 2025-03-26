import { useState } from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function DreamonList() {
  const router = useRouter();
  const [position, setPosition] = useState(0);

  const api = process.env.apiImages;
  const imgChoose = [
    { img: `${api}/[home]_imgNy.png`, categorie: 'Urban', destiny: 'New York' },
    {
      img: `${api}/[home]_eligeGrecia.png`,
      categorie: 'Unique',
      destiny: 'Islas Griegas',
    },
    {
      img: `${api}/[home]_imgToscana.png`,
      categorie: 'Landscape',
      destiny: 'La Toscana',
    },
    { img: `${api}/[home]_eligeCuba.png`, categorie: 'Relax', destiny: 'Cuba' },
  ];

  const filterSetting = useSelector((state) => state.counter.filters);

  const getInfo = () => {
    const filter = filterSetting?.find((filter) => filter.id === 'categoryIds');
    const items = filter?.items || [];
    const itemChooseWithId = imgChoose?.map((itemChoose) => {
      const item = items?.find(
        (item) => item.dataName === itemChoose?.categorie
      );
      if (!item?.id) return itemChoose;
      return {
        ...itemChoose,
        id: item?.id,
      };
    });

    return itemChooseWithId;
  };

  function moveFirstAndLast(arr) {
    if (arr.length >= 2) {
      let firstElement = arr.shift();
      arr.push(firstElement);
    }
    return arr;
  }

  function moveLastToFirst(arr) {
    if (arr.length >= 2) {
      let lastElement = arr.pop();
      arr.unshift(lastElement);
    }
    return arr;
  }

  const changeArray = (arr, pos) => {
    const amount = Math.abs(pos);
    let aux = arr;
    for (let i = 0; i < amount; i++) {
      if (pos > 0) {
        aux = moveFirstAndLast(arr);
      } else {
        aux = moveLastToFirst(arr);
      }
    }
    return aux;
  };

  const imgChooseWithPosition = changeArray(getInfo(), position);

  return (
    <div className="dreamonList">
      <div className="btnFormat">
        <FontAwesomeIcon
          size="2x"
          icon={faChevronCircleLeft}
          onClick={() => setPosition(position - 1)}
          style={{ cursor: 'pointer', padding: 10 }}
        />
        <FontAwesomeIcon
          size="2x"
          icon={faChevronCircleRight}
          onClick={() => setPosition(position + 1)}
          style={{ cursor: 'pointer', padding: 10 }}
        />
      </div>
      <div className="imgContainer">
        {imgChooseWithPosition.map((item, index) => (
          <div
            className={`chooseImg`}
            key={index}
            style={{ backgroundImage: `url(${item.img})` }}
            onClick={() =>
              !!item?.id && router.push(`/search?categoryIds=${item.id}`)
            }
          >
            <div className="textInfo">
              <h3 className="categorie">{item.categorie}</h3>
              <p className="destiny">{item.destiny}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
