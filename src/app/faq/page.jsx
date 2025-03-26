'use client';

import './styles.scss';

import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { noop } from '@/utils/utils';
import { faqQuestionsAndResponses } from '@/utils/faq';

import ClubVip from '@/components/clubVip';
import { HeaderContact } from '@/app/contacto/page';
import { FormContactWithContactInformation } from '@/components/formContact';
import { useSearchParams } from 'next/navigation';

const FqaSquaresData = [
  {
    title: 'Sobre la compra',
    image: './images/faq/carrito.png',
    id: 'SOBRE_LA_COMPRA',
  },
  {
    title: 'Uso de cuenta',
    image: './images/faq/cuenta.png',
    id: 'USO_DE_CUENTA',
  },
  {
    title: 'Cambios y reembolsos',
    image: './images/faq/cambios.png',
    id: 'CAMBIOS_Y_REEMBOLSOS',
  },
  {
    title: 'Uso de regalos',
    image: './images/faq/regalos.png',
    id: 'USO_DE_REGALOS',
  },
  {
    title: 'Envios',
    image: './images/faq/envios.png',
    id: 'ENVIOS',
  },
  {
    title: 'Hacer una reserva',
    image: './images/faq/reservas.png',
    id: 'HACER_UNA_RESERVA',
  },
  {
    title: 'Legales',
    image: './images/faq/legales.png',
    id: 'LEGALES',
  },
  {
    title: 'Política de privacidad',
    image: './images/faq/privacidad.png',
    id: 'POLITICA_DE_PRIVACIDAD',
  },
];

const FqaSquare = ({ image, title = '', selected = false, onClick = noop }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 170,
        height: 170,
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        cursor: 'pointer',
        ...(selected
          ? {
              boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.35)',
            }
          : {}),
      }}
    >
      <img src={image} style={{ width: 40, maxHeight: 70 }} />
      <span
        style={{
          fontSize: 14,
          textAlign: 'center',
          padding: 10,
        }}
      >
        {title}
      </span>
    </div>
  );
};

const QuestionsAndResponses = ({ selectedSquare }) => {
  let filteredQuestionsAndResponses = faqQuestionsAndResponses;
  if (selectedSquare) {
    filteredQuestionsAndResponses = faqQuestionsAndResponses.filter((item) =>
      (item?.categories || []).includes(selectedSquare)
    );
  } else {
    // Si no hay seleccionado ningun cuadrado, no mostrar las preguntas de politica de privacidad
    filteredQuestionsAndResponses = faqQuestionsAndResponses.filter(
      (item) => !(item?.categories || []).includes('POLITICA_DE_PRIVACIDAD')
    );
  }
  return (
    <div className="questionsAndResponsesContainer">
      <hr style={{ borderWidth: 1, backgroundColor: 'silver' }} />
      {filteredQuestionsAndResponses.map((item, index) => (
        <div key={index} style={{}}>
          <Accordion
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              <h3 style={{ color: 'black', marginTop: 25, marginBottom: 25 }}>
                {item.title}
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className="faqResponseContainer"
                style={{ color: 'black' }}
                dangerouslySetInnerHTML={{
                  __html: item.body,
                }}
              ></div>
            </AccordionDetails>
          </Accordion>
          <hr style={{ borderWidth: 1, backgroundColor: 'silver' }} />
        </div>
      ))}
    </div>
  );
};

const FqaSquares = ({ selectedSquare, onSelectSquare = noop }) => {
  return (
    <div className="faqSquaresGridContainer">
      {FqaSquaresData?.map((item) => (
        <FqaSquare
          key={item?.id}
          title={item.title}
          image={item.image}
          onClick={() => {
            onSelectSquare(item.id)
          }}
          selected={String(selectedSquare) === String(item.id)}
        />
      ))}
    </div>
  );
};

export default function Faq() {
  const searchParams = useSearchParams();

  const [selectedSquare, setSelectedSquare] = useState(searchParams.get('category') || null);

  const handleSelectSquare = (id) => {
    if (String(selectedSquare) === String(id)) {
      return setSelectedSquare(null);
    } else {
      setSelectedSquare(id);
    }
  };

  return (
    <main>
      <div
        className="faqContainer"
        style={{
          paddingTop: 150,
        }}
      >
        <FqaSquares
          selectedSquare={selectedSquare}
          onSelectSquare={handleSelectSquare}
        />
        <br />
        <br />
        <QuestionsAndResponses selectedSquare={selectedSquare} />

        <HeaderContact
          title={<span>¿No encontraste lo que estabas buscando?</span>}
          subtitle={
            <span>
              No te preocupes, estamos aquí para ayudarte. <br />
              Envíanos tu consulta y te responderemos en breve.
            </span>
          }
        />

        <FormContactWithContactInformation />

        <br />
      </div>
      <ClubVip />
    </main>
  );
}
