'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PerfilData from '@/components/perfilData';
import ClubVip from '@/components/clubVip';
import { useEffect, useState } from 'react';
import {
  GetProfile,
  GetAllDreamonsGiver,
  GetAllDreamonsReciver,
  UploadProfilePicture,
} from '@/redux/feature/counterApi';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress from '@mui/material/CircularProgress';
import UserReciverAndGiver from '@/components/account/contentData';
import ReciverAndGiverMobile from '@/components/account/contentDataMobile';

import './styles.scss';

export default function Account() {
  const api = process.env.apiImages;
  const bgSliceApi = `${api}/[account]_sliceX2.png`;
  const bgSlice = { backgroundImage: `url(${bgSliceApi})` };

  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingProfileImage, setIsLoadingProfileImage] = useState(false);
  const [dreamonGiver, setDreamonGiver] = useState([]);
  const [dreamonReciver, setDreamonReciver] = useState([]);

  const router = useRouter();
  const userData = useSelector((state) => state.counter.user.info);

  const userEmail =
    userData?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

  const userid =
    userData?.[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  const getDreamonByUser = async () => {
    try {
      const dreamonsGiver = await GetAllDreamonsGiver(userid);
      setDreamonGiver(dreamonsGiver);

      const dreamonsReciver = await GetAllDreamonsReciver(userid);
      setDreamonReciver(dreamonsReciver);
    } catch (error) {
      console.error('Error fetching dreamons:', error);
    }
  };

  const getProfileAndMapToState = async () => {
    setIsLoadingProfileImage(true);
    try {
      const response = await GetProfile();
      setUserProfile(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingProfileImage(false);
    }
  };

  useEffect(() => {
    getProfileAndMapToState();
  }, []);

  useEffect(() => {
    getDreamonByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadProfileImg = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoadingProfileImage(true);
      const response = await UploadProfilePicture(formData);
      getProfileAndMapToState();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoadingProfileImage(false);
    }
  };

  const handleProfileImageSelection = (event) => {
    event.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleUploadProfileImg;
    input.click();
  };

  return (
    <main className='accountPage'>
      <div className='accountPage_slice' style={bgSlice}>
        <div className='accountPage_slice_perfil'>
          <div className='perfilImg' style={{ position: 'relative' }}>
            <Image
              className='perfilImg_avatar'
              alt='perfil img'
              src={
                userProfile?.image ||
                `user-default.jpeg`
              }
              width={100}
              height={100}
              unoptimized={true}
            />
            {isLoadingProfileImage && (
              <div className='perfilImg_avatar_progress'>
                <CircularProgress />
              </div>
            )}
            <div
              className='perfilImg_avatar_notProgress'
              onClick={
                isLoadingProfileImage ? null : handleProfileImageSelection
              }
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
          </div>
          <h1>¡Hola {userData?.FirstName}!</h1>
        </div>
      </div>
      {window.innerWidth <= 768 && (
        <section className='perfilData'>
          <PerfilData
            profileData={userData}
            name={userData?.FirstName}
            lastname={userData?.LastName}
            email={userEmail}
            password={'*********'}
          />
        </section>
      )}
      <div className='accountPage_content'>
        {window.innerWidth > 768 ? (
          <UserReciverAndGiver
            dreamonGiver={dreamonGiver}
            dreamonReciver={dreamonReciver}
          />
        ) : (
          <ReciverAndGiverMobile
            dreamonGiver={dreamonGiver}
            dreamonReciver={dreamonReciver}
          />
        )}
        {window.innerWidth > 768 && (
          <section className='perfilData'>
            <PerfilData
              profileData={userData}
              name={userData?.FirstName}
              lastname={userData?.LastName}
              email={userEmail}
              password={'*********'}
            />
          </section>
        )}
      </div>
      <ClubVip />
    </main>
  );
}
