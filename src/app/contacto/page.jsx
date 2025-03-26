'use client';

import ClubVip from '@/components/clubVip';
import { FormContactWithContactInformation } from '@/components/formContact';

import './styles.scss';

export const HeaderContact = ({ title = <></>, subtitle = <></> }) => (
  <div
    className="headerContactContainer"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '75px 20px',
    }}
  >
    <h1
      style={{
        color: 'black',
        marginBottom: '20px',
      }}
    >
      {title}
    </h1>
    <span className={"spanSubtitle"}>{subtitle}</span>
  </div>
);

export default function Contact() {
  return (
    <main>
      <div className="contactContainer container">
        <HeaderContact
          title={<span>En que podemos ayudarte?</span>}
          subtitle={
            <span >
              Podes encontrar tu duda en <b>preguntas frecuentes</b> o llenar el
              formulario de contacto
            </span>
          }
        />

        <FormContactWithContactInformation />
      </div>

      <ClubVip />
    </main>
  );
}
