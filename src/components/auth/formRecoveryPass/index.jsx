import Image from 'next/image';
import { useState } from 'react';
import { ForgotPassword } from '@/redux/feature/counterApi';

import './styles.scss';

export default function RecoveryPass({ setState }) {
  const logoDreamon = process.env.apiLogoMedium;
  const api = process.env.apiImages;

  const [isLoadingRecovery, setIsLoadingRecovery] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [recoveryFailed, setRecoveryFailed] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [recoveryData, setRecoveryData] = useState({
    email: '',
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setRequiredEmail(false);
    setRecoveryData((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSuccess = async () => {
    setIsLoadingRecovery(true);
    setRecoverySuccess(false);
    setRecoveryFailed(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = recoveryData.email.match(emailRegex);
    try {
      if (!isEmailValid) {
        setRequiredEmail(true);
        return;
      }

      const { ok } = await ForgotPassword(recoveryData.email);
      if (!ok) {
        throw new Error('Error al recuperar la contraseña');
      }
      
      setRecoverySuccess(true);
    } catch (error) {
      setRecoveryFailed(true);
    } finally {
      setIsLoadingRecovery(false);
    }
  };

  return (
    <main className='forgetPass'>
      <div className='logoDreamon'>
        <Image alt='logoDreamon' src={logoDreamon} width={168} height={27.09} />
      </div>
      <h3 className='titleLogin'>
        Ingresá el correo electrónico asociado a tu cuenta de Dreamon para
        restablecer tu contraseña.
      </h3>
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
        value={recoveryData.email}
        onChange={handleInput}
        style={{
          borderColor: requiredEmail ? '#ed8067' : 'none',
          borderWidth: requiredEmail ? '0.1px' : 'none',
          borderStyle: requiredEmail ? 'solid' : 'none',
        }}
      />
      {requiredEmail && (
        <p className='errorMsgInput' style={{ marginBottom: '13px' }}>
          Ingresa un Email valido
        </p>
      )}
      {isLoadingRecovery && (
        <p className='errorMsgInput' style={{ marginBottom: '13px' }}>
          Espere un momento...
        </p>
      )}
      <button
        className='btnRadien'
        style={{ marginBottom: '13px' }}
        onClick={handleSuccess}
        disabled={isLoadingRecovery}
      >
        Recuperar contraseña
      </button>
      {recoverySuccess && (
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
            <span style={{ fontWeight: '500' }}>¡Gracias!</span> Te llegara un
            email a tu casilla de correo para recuperar tu contraseña.
          </p>
        </div>
      )}
      {recoveryFailed && (
        <div className='successFailed'>
          <div className='successFailed_icon'>
            {/* <Image
              alt='icon'
              src={`${api}/[icon]_success.svg`}
              width={10.23}
              height={8.37}
            /> */}
          </div>
          <p>
            <span style={{ color: 'red', fontWeight: '500' }}>¡Error!</span> Ha ocurrido un problema al intentar recuperar tu contraseña. Por favor, verifica que la dirección de correo electrónico es correcta.
          </p>
        </div>
      )}
      <p className='register'>
        ¿No estás registrado?{' '}
        <span
          style={{ color: '#ecbf52', cursor: 'pointer' }}
          onClick={() => setState(false)}
        >
          Registrate
        </span>
      </p>
    </main>
  );
}
