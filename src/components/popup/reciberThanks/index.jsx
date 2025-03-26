import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SendThanks } from '@/redux/feature/counterApi';

import './styless.scss';

export default function ReciberThanks({ setReciverThanks, reciverThanks }) {
  const userInfo = useSelector((state) => state.counter.user);
  const dreamonId = userInfo?.reciver?.id;

  const [messageThanks, setMessageThanks] = useState({
    idDreamon: dreamonId,
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMessageThanks((prevent) => ({
      ...prevent,
      [name]: value,
    }));
  };

  const handleSend = async () => {
    const sendThanks = await SendThanks(messageThanks);
    if (sendThanks) {
      setReciverThanks(!reciverThanks);
    }
  };

  return (
    <main className='reciberThanks'>
      <section className='reciberThanks_section'>
        <h1 style={{ fontWeight: 500 }}>¡Que bueno es ser agradecido!</h1>
        <p>
          Envíale unas palabras de agradecimiento a quien te hizo este regalo
        </p>
        <input
          type='text'
          className='inputs'
          placeholder='Asunto'
          name='subject'
          value={messageThanks.subject}
          onChange={handleChange}
        />
        <textarea
          type='text'
          className='inputsMessage'
          placeholder='Mensaje*'
          name='message'
          value={messageThanks.message}
          onChange={handleChange}
        />
        <button onClick={handleSend} className='btnRadien'>
          Enviar
        </button>
      </section>
    </main>
  );
}
