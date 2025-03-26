import { useState } from 'react';
import { SendFavoritesPacakges } from '@/redux/feature/counterApi';

import './styles.scss';

export default function ShareFavoritePackage({ handleSendEmail, data }) {
  const [sendFavorites, setSendFavorites] = useState({ email: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSendFavorites({
      ...sendFavorites,
      [name]: value,
    });
  };

  const isEmailValid = () => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sendFavorites.email);
  };

  const handleSend = () => {
    if (isEmailValid()) {
      SendFavoritesPacakges(sendFavorites.email);
      handleSendEmail();
    } else {
      // alert('Por favor, ingresa una dirección de correo electrónico válida.');
    }
  };

  return (
    <main className='sharePackage'>
      <section className='sharePackage_section'>
        <h1 style={{ paddingBottom: 20 }}>Comparte está experiencia</h1>
        {/* {data?.map((item, index) => (
          <p style={{ marginTop: '5px', marginBottom: '5px' }} key={index}>
            {item.name}
          </p>
        ))} */}
        <input
          name='email'
          value={sendFavorites.email}
          type='email'
          placeholder='Mail*'
          className='inputs'
          onChange={handleInputChange}
        />
        <textarea
          placeholder='Mira esta increíble experiencia…'
          className='inputsMessage'
        />
        <button className='btnRadien' onClick={handleSend}>
          Enviar
        </button>
      </section>
    </main>
  );
}
