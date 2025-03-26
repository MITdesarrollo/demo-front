import { useState } from 'react';
import { newsletterClubVip } from '@/redux/feature/counterApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import './styles.scss';

export default function ClubVip() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorBackgroundColor, setErrorBackgroundColor] = useState('');
  const [errorIconDisplay, setErrorIconDisplay] = useState('');
  const [errorIconBgDisplay, setErrorIconBgDisplay] = useState('');

  const [errorMsg, setErrorMsg] = useState({
    success: '¡Gracias por suscribirte!',
    warning: '¡Ups! Este correo ya está suscrito',
    error:
      'Parece que este correo no es válido. Revisalo y vuelve a intentarlo',
  });

  const [newsLetter, setNewsLetter] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const router = useRouter();
  const api = process.env.apiImages;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewsLetter(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(value));
  };

  const handleSubmit = async () => {
    if (isValidEmail && newsLetter.length > 0) {
      const newsLetterVIP = await newsletterClubVip(newsLetter);

      if (newsLetterVIP === false) {
        // Correo ya suscrito
        setErrorMessage(errorMsg.warning);
        setErrorBackgroundColor('#ffe5a7');
        setErrorIconDisplay(`${api}/[icon]_warning.svg`);
        setErrorIconBgDisplay('#ecbf52');
        setShowError(true);
      } else if (newsLetterVIP === true) {
        // Suscripción exitosa
        setErrorMessage(errorMsg.success);
        setErrorBackgroundColor('#b2f8e2');
        setErrorIconDisplay(`${api}/[icon]_success.svg`);
        setErrorIconBgDisplay('#21c14b');
        setShowError(true);
      } else {
        // Error o resultado no esperado
        setErrorMessage(errorMsg.error);
        setErrorBackgroundColor('#ffbaaa');
        setErrorIconBgDisplay('#ff3636');
        setErrorIconDisplay(`${api}/[icon]_error.svg`);
        setShowError(true);
      }
    } else {
      // Correo no válido
      setErrorMessage(errorMsg.error);
      setErrorBackgroundColor('#ffbaaa');
      setErrorIconBgDisplay('#ff3636');
      setErrorIconDisplay(`${api}/[icon]_error.svg`);
      setShowError(true);
    }
  };

  return (
    <main className='clubVip'>
      <div className='clubVip_text'>
        <h4>Únite a nuestro club VIP</h4>
        <p>Suscríbite a nuestro newsletter y ahorrá en tu próxima compra.</p>
      </div>
      <div className='clubVip_newsletter'>
        <div className='clubVip_newsletter_btn'>
          <input
            className='clubVip_Input'
            type='email'
            required
            name='email'
            placeholder='Ingresá tu correo electrónico'
            value={newsLetter}
            onChange={handleInputChange}
            style={{
              marginBottom: showError && window.innerWidth <= 768 && '10px',
            }}
          />
          {showError && window.innerWidth <= 768 ? (
            <div
              className='errorContainerVIP'
              style={{ backgroundColor: errorBackgroundColor, marginTop: '0' }}
            >
              <div
                className='iconContainer'
                style={{ backgroundColor: errorIconBgDisplay }}
              >
                <Image src={errorIconDisplay} alt='icon' width={7} height={7} />
              </div>
              <span className='error'>{errorMessage}</span>
            </div>
          ) : null}
          <button className='clubVip_btn' onClick={handleSubmit}>
            Enviar
          </button>
        </div>
        {showError && window.innerWidth > 768 ? (
          <div
            className='errorContainerVIP'
            style={{ backgroundColor: errorBackgroundColor }}
          >
            <div
              className='iconContainer'
              style={{ backgroundColor: errorIconBgDisplay }}
            >
              <Image src={errorIconDisplay} alt='icon' width={7} height={7} />
            </div>
            <span className='error'>{errorMessage}</span>
          </div>
        ) : null}
        <p style={{ marginTop: window.innerWidth <= 768 ? '30px' : '10px' }}>
          <span
            onClick={() => window.open('/terminosycondiciones', '_blank')}
            style={{ cursor: 'pointer' }}
          >
            Términos y condiciones
          </span>{' '}
          <span
            onClick={() => router.push('/faq?category=POLITICA_DE_PRIVACIDAD')}
            style={{ cursor: 'pointer' }}
          >
            - Política de privacidad
          </span>
        </p>
      </div>
    </main>
  );
}
