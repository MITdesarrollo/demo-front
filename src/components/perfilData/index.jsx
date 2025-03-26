import { useState } from 'react';
import EditProfile from '../popup/editProfile';

import './styless.scss';

export default function PerfilData(props) {
  const { name, lastname, email, password, profileData } = props;
  const [editForm, setEditForm] = useState(false);

  return (
    <>
      <main className='data'>
        <section className='perfilData'>
          <div className='perfilData_content'>
            <h3 className='perfilData_content_title'>Datos</h3>
            <p className='perfilData_content_sub'>
              Mantenemos sus datos completamente privados. Consulte nuestros
              términos y condiciones para obtener más detalles.
            </p>
            <div className='perfilData_info'>
              <div className='perfilData_info_name'>
                <p className='subTitle'>Nombre:</p>
                <p className='infoUser' style={{ fontWeight: '500' }}>
                  {name}
                </p>
              </div>
              <div className='perfilData_info_lastName'>
                <p className='subTitle'>Apellido:</p>
                <p className='infoUser' style={{ fontWeight: '500' }}>
                  {lastname}
                </p>
              </div>
              <div className='perfilData_info_email'>
                <p className='subTitle'>Email:</p>
                <p className='infoUser' style={{ fontWeight: '500' }}>
                  {email}
                </p>
              </div>
              <div className='perfilData_info_pass'>
                <p className='subTitle'>Contraseña:</p>
                <p className='infoUser' style={{ fontWeight: '500' }}>
                  {password}
                </p>
              </div>
            </div>
          </div>
          <button className='btnRadien' onClick={() => setEditForm(true)}>
            Editar{' '}
          </button>
        </section>
      </main>
      {editForm && (
        <EditProfile setEditForm={setEditForm} profileData={profileData} />
      )}
    </>
  );
}
