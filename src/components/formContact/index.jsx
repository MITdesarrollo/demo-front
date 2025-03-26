'use client';
import { useState, useEffect } from 'react';

import { sendContactInformation } from '@/redux/feature/counterApi';
import { Alert, AlertTitle, AlertDescription } from '@/components/alert';

import './styles.scss';

const contactData = [
  {
    title: 'Sede Central',
    data: [
      'Direccion Av. Juramento 1805, C1428 CABA',
    ],
  },
  {
    title: 'Oficina',
    data: ['+54 9 11 5256-5050'],
  },
  {
    title: 'Email',
    data: ['info@dreamon.gift'],
  },
];

export const FormContactWithContactInformation = () => {
  return (
    <div className="contentContactContainer">
      <FormContact />
      <ContactInformationContainer data={contactData} />
    </div>
  );
};

const ContactInformationContainer = ({ data = [] }) => (
  <div
    className="informationContactContainer"
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '0 100px',
    }}
  >
    {data?.map((item, index) => (
      <>
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: (index > 0 ? '40px' : '0') + ' 0px 40px',
          }}
        >
          <span className="spanContact">
            {item?.title}
          </span>
          <span>{item?.data.join(' | ')}</span>
        </div>
        <hr />
      </>
    ))}
  </div>
);

export const FormContact = ({}) => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccessMessageDisplayed, setIsSuccessMessageDisplayed] =
    useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [contactInformation, setContactInformation] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (isSuccessMessageDisplayed) {
      setTimeout(() => {
        setIsSuccessMessageDisplayed(false);
      }, 4000);
    }
  }, [isSuccessMessageDisplayed]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setContactInformation({
      ...contactInformation,
      [name]: value,
    });
  };

  const handleSendContactInformation = async () => {
    try {
      setIsSending(true);

      const result = await sendContactInformation(contactInformation);
      if (!result) {
        throw new Error('Error al enviar el mensaje');
      }

      setContactInformation({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSending(false);
      setIsSuccessMessageDisplayed(true);
    } catch (error) {
      setErrorMsg('Error al enviar el mensaje');
    }
  };

  return (
    <div className="formContactContainer">
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <span className="spanForm">
          Podes consultar antes en{' '}
          <a className="faqLink" href="/faq">
            preguntas frecuentes
          </a>{' '}
          o completá tus datos a continuación que en breve te respondemos
        </span>
      </div>
      <hr
        style={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />
      <div>
        <div className="inputContainer">
          <input
            type="text"
            required
            className="inputText"
            placeholder="Nombre completo*"
            name="name"
            value={contactInformation?.name}
            onChange={handleInput}
            style={{}}
            disabled={isSending}
          />
        </div>
        <div className="inputContainer">
          <input
            type="email"
            required
            className="inputText"
            placeholder="Correo electrónico*"
            name="email"
            value={contactInformation?.email}
            onChange={handleInput}
            style={{}}
            disabled={isSending}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            required
            className="inputText"
            placeholder="Asunto*"
            name="subject"
            value={contactInformation?.subject}
            onChange={handleInput}
            style={{}}
            disabled={isSending}
          />
        </div>
        <div className="inputContainer">
          <textarea
            type="text"
            required
            className="inputText"
            placeholder="Mensaje*"
            name="message"
            value={contactInformation?.message}
            onChange={handleInput}
            style={{
              height: '200px',
            }}
            disabled={isSending}
          />
        </div>
      </div>
      <div>
        {isSuccessMessageDisplayed && (
          <Alert variant="success">
            <AlertDescription>
              Tu mensaje ha sido enviado correctamente
            </AlertDescription>
          </Alert>
        )}

        {!!errorMsg && (
          <Alert variant="destructive">
            <AlertDescription>
              Su mensaje no pudo ser enviado. Por favor revise los datos
              ingresados
            </AlertDescription>
          </Alert>
        )}
      </div>
      <button
        style={{
          marginTop: 30,
        }}
        className="btnRadien"
        onClick={handleSendContactInformation}
        disabled={isSending}
      >
        Enviar
      </button>
    </div>
  );
};
