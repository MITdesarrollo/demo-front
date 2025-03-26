'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ResetPassword } from '@/redux/feature/counterApi';

import './styles.scss';
import { isPasswordValid } from '@/utils/auth';

export default function RecoveryPassword({ token }) {
  const logoDreamon = process.env.apiLogoMedium;
  const api = process.env.apiImages;
  const router = useRouter();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const errorText = {
    errorRequiret: 'Este campo es obligatorio',
    errorPass01:
      'Debe tener entre 8 y 32 caracteres de longitud. Debe incluir letras minúsculas, mayúsculas y carateres numéricos.',
    errorPass02: 'Contraseña y Confirmar contraseña no coinciden',
    errorEmail: 'Introduce un email valido',
    errorServer: 'Se produjo un error, intente nuevamente',
  };

  const [validationFlags, setValidationFlags] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleInput = (event) => {
    setErrorMessage('');
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    setValidationFlags((prevFlags) => ({
      ...prevFlags,
      [name]: false, // Reset the validation flag when input changes
    }));

    setPasswordMatchError(false);
  };

  const handleChangePass = async () => {
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = credentials.email.match(emailRegex);

    if (!isEmailValid) {
      setValidationFlags((prevFlags) => ({
        ...prevFlags,
        email: true,
      }));
    }

    if (credentials.password !== credentials.passwordConfirmation) {
      setPasswordMatchError(true);
      return;
    }

    const passValid = isPasswordValid(credentials.password);

    if (!passValid) {
      setValidationFlags((prevFlags) => ({
        ...prevFlags,
        password: true,
      }));
      return;
    }

    const resetPass = await ResetPassword(
      credentials.email,
      token,
      credentials.password
    );

    if (!resetPass) {
      setErrorMessage(errorText.errorEmail);
      return false;
    }

    setCredentials({
      email: '',
      password: '',
      passwordConfirmation: '',
    });
    setShowSuccess(true);

    setPasswordMatchError(false);
    router.push('/auth');
  };

  return (
    <main className='forgetPass'>
      <div className='logoDreamon'>
        <Image alt='logoDreamon' src={logoDreamon} width={168} height={27.09} />
      </div>
      <h3 className='titleLogin'>Restablecer contraseña</h3>
      <div className='separator'></div>
      <p className='subTitle'>
        Mantenemos tus datos completamente privados. Consulte nuestros términos
        y condiciones para obtener más información.
      </p>
      <input
        type='email'
        required
        className='inputEmail'
        placeholder='Correo electrónico*'
        name='email'
        value={credentials.email}
        onChange={handleInput}
        style={{
          borderColor: validationFlags.email ? '#ed8067' : 'none',
          borderWidth: validationFlags.email ? '0.1px' : 'none',
          borderStyle: validationFlags.email ? 'solid' : 'none',
        }}
      />
      {validationFlags.email && (
        <div className='errorInput'>
          <span className='error'>Ingresa un Email valido</span>
        </div>
      )}
      <input
        type={showPassword ? 'text' : 'password'}
        required
        className='inputPass'
        placeholder='Contraseña*'
        name='password'
        value={credentials.password}
        onChange={handleInput}
        style={{
          borderColor: validationFlags.password ? '#ed8067' : 'none',
          borderWidth: validationFlags.password ? '0.1px' : 'none',
          borderStyle: validationFlags.password ? 'solid' : 'none',
        }}
      />
      {validationFlags.password && (
        <div
          className='errorMsgInput'
          style={{ marginBottom: errorText.errorPass01 && '11px' }}
        >
          {credentials.password.length <= 0 ? (
            <span className='error'>{errorText.errorRequiret}</span>
          ) : (
            <span className='error'>{errorText.errorPass01}</span>
          )}
        </div>
      )}
      <input
        type={showPasswordC ? 'text' : 'password'}
        required
        className='inputPass'
        placeholder='Confirmar contraseña*'
        name='passwordConfirmation'
        value={credentials.passwordConfirmation}
        onChange={handleInput}
        style={{
          borderColor: validationFlags.passwordConfirmation
            ? '#ed8067'
            : 'none',
          borderWidth: validationFlags.passwordConfirmation ? '0.1px' : 'none',
          borderStyle: validationFlags.passwordConfirmation ? 'solid' : 'none',
        }}
      />
      {validationFlags.passwordConfirmation && (
        <div className='errorInput'>
          {credentials.passwordConfirmation.length <= 0 ? (
            <span className='error'>{errorText.errorRequiret}</span>
          ) : (
            <span className='error'>{errorText.errorPass01}</span>
          )}
        </div>
      )}
      {passwordMatchError && (
        <div className={'errorInput'}>
          <span className='error'>{errorText.errorPass02}</span>
        </div>
      )}
      {errorMessage && (
        <div className={'errorInput'}>
          <span className='error'>{errorMessage}</span>
        </div>
      )}
      <button
        className='btnRadien'
        style={{ marginBottom: '13px' }}
        onClick={handleChangePass}
      >
        Cambiar contraseña
      </button>
      {/* {recoverySuccess && (
        <div className='successRecovery'>
          <div className='successRecovery_icon'>
            <Image
              alt='icon'
              src={`${api}/[icon]_success.svg`}
              width={10.23}
              height={8.37}
            />
          </div>
          <p>
            <span style={{ fontWeight: '700' }}>¡Gracias!</span> Te llegara un
            email a tu casilla de correo para recuperar tu contraseña.
          </p>
        </div>
      )} */}
      <p className='register' style={{ fontSize: '11px' }}>
        ¿Ya tenés una cuenta de Dreamon?{' '}
        <span
          style={{ color: '#ecbf52', cursor: 'pointer' }}
          onClick={() => router.push('/auth')}
        >
          Iniciá sesión
        </span>
      </p>
    </main>
  );
}
