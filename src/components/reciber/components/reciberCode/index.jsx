import { useState } from 'react';
import { ReciverDreamonById } from '@/redux/feature/counterApi';
import { useDispatch } from 'react-redux';
import { setReciverDreamon } from '@/redux/feature/counterSlice';

import './styles.scss';

export default function ReciberCard({ setStep }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setErrorMsg('');
    if (event.target.value.length <= 8) {
      setInputValue(event.target.value);
    }
  };

  const handleReciver = async () => {
    setErrorMsg('');
    const reciverStatus = await ReciverDreamonById(inputValue);

    if (reciverStatus.error && inputValue) {
      setErrorMsg(reciverStatus);
    } else if (!inputValue) {
      setErrorMsg({ error: 'Introduce un codigo' });
    }

    if (!reciverStatus.error) {
      dispatch(setReciverDreamon(reciverStatus));
      setStep(2);
    }
  };

  return (
    <main className='reciber_card'>
      <section className='reciber_card_content'>
        <h3 className='reciber_card_content_title'>
          Ingresá tu código dreamon
        </h3>
        <input
          className='reciber_card_content_input'
          placeholder='Código de 8 dígitos'
          type='text'
          id='myInput'
          value={inputValue}
          onChange={handleInputChange}
          maxLength='8'
        ></input>
        {errorMsg?.error?.length > 0 && (
          <div className='errorInput' style={{ margin: '0', height: '20px' }}>
            <p className='error' style={{ margin: '0' }}>
              {errorMsg.error}
            </p>
          </div>
        )}
        <p className='reciber_card_content_info'>Donde lo encuentro?</p>
        <button className='btnRadien' onClick={handleReciver}>
          ¡Abrir mi Dreamon!
        </button>
      </section>
    </main>
  );
}
