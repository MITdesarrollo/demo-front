'use client';

import { useState, useEffect } from 'react';
import LoginUser from '@/components/formLogin';
import RegisterUser from '@/components/formRegister';
import RegisterSuccess from '@/components/states/registerSuccess';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/feature/counterSlice';
import { decodeToken, getAuthToken } from '@/utils/auth';
import RecoveryPass from '@/components/auth/formRecoveryPass';

import './styles.scss';
import UserAlreadyExist from '@/components/states/userAlreadyExist';

export default function Register() {
  const [state, setState] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const registerQueryParam = params.get('register');

  useEffect(() => {
    if (registerQueryParam === 'true') {
      setState(false);
    }
  }, [registerQueryParam]);

  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  const handleSucess = (state) => {
    const userToken = getAuthToken();
    if (userToken) {
      const decodedToken = async () => {
        const infoToken = await decodeToken(userToken);
        dispatch(setUserInfo(infoToken));
      };
      decodedToken();
    }

    router.back();
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <main className='registerPage'>
      {state ? (
        forgetPass ? (
          <RecoveryPass setState={setState} />
        ) : (
          <LoginUser
            setState={setState}
            handleSucess={handleSucess}
            dispatch={dispatch}
            credentials={credentials}
            handleInput={handleInput}
            setForgetPass={setForgetPass}
          />
        )
      ) : (
        <RegisterUser
          setState={setState}
          setShowSuccess={setShowSuccess}
          setForgetPass={setForgetPass}
          setUserAlreadyExist={setUserAlreadyExist}
        />
      )}
      {showSuccess && <RegisterSuccess onClose={handleCloseModal} />}
      {userAlreadyExist && (<UserAlreadyExist onClose={() => setUserAlreadyExist(false)} />)}
    </main>
  );
}
