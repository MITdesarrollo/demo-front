import { useState } from 'react';
import LoginCart from '../loginCard';
import RegisterCart from '../registerCart';

import './styless.scss';

export default function CartSession() {
  const [showAction, setShowAction] = useState(true);

  return (
    <main className='cart_content_info_session'>
      <div className='cart_content_info_session_account'>
        <button
          className={`btn_create ${!showAction ? 'active' : ''}`}
          onClick={() => setShowAction(false)}
        >
          Registrarse
        </button>
        <button
          className={`btn_login ${showAction ? 'active' : ''}`}
          onClick={() => setShowAction(true)}
        >
          Iniciá sesión
        </button>
      </div>
      {showAction ? (
        <LoginCart setShowAction={setShowAction} />
      ) : (
        <RegisterCart setShowAction={setShowAction} />
      )}
    </main>
  );
}
