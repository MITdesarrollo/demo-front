'use client';

import {
  categoryDreamon,
  // getCookieByShoopingCart,
  getFilters,
  setUserInfo,
} from '@/redux/feature/counterSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SliceHome from '@/components/sliceHome';
import ChooseDreamon from '@/components/chooseDreamon';
import GiftMoments from '@/components/giftMoments';
import BannerHome from '@/components/banner';
import { decodeToken, getAuthToken } from '@/utils/auth';
import DreamonList from '../components/dreamonList';

export default function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const userAviable = useSelector((state) => state.user?.login);
  // const categories = useSelector((state) => state.counter.categories);
  // const shoppingCartId = useSelector(
  //   (state) => state.counter?.shoppingCartId?.id
  // );

  const dispatchData = () => {
    try {
      dispatch(categoryDreamon());
      dispatch(getFilters());
      // if (!shoppingCartId) {
      //   dispatch(getCookieByShoopingCart());
      // }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      dispatchData();

      if (!userAviable) {
        const userToken = getAuthToken();
        if (userToken) {
          const decodedToken = async () => {
            const infoToken = await decodeToken(userToken);
            dispatch(setUserInfo(infoToken));
          };
          decodedToken();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <main style={{ backgroundColor: '#F7F7F7' }}>
      <SliceHome />
      <ChooseDreamon />
      <DreamonList />
      <GiftMoments />
      <BannerHome />
    </main>
  );
}
