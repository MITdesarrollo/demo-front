import { useState } from 'react';
import { registerUser } from '@/utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import './styless.scss';

export default function RegisterCart({ setShowAction }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const [validationFlags, setValidationFlags] = useState({
    name: false,
    lastName: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

  const [credentials, setCredentials] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPasswordC(!showPasswordC);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setValidationFlags((prevFlags) => ({
      ...prevFlags,
      [name]: false, // Reset the validation flag when input changes
    }));
  };

  const handleRegister = async () => {
    if (credentials.password !== credentials.passwordConfirmation) {
      setPasswordMatchError(true);
      return;
    }

    const newUser = await registerUser(credentials, setValidationFlags);

    if (newUser) {
      setCredentials({
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      });
      setShowAction(true);
    }

    setPasswordMatchError(false);
    return false;
  };

  return (
    <main className='option'>
      <div className='option_important'>
        <p className='option_important_text'>
          Mantenemos tus datos completamente privados.
        </p>
        <p className='option_important_text'>
          Consulte nuestros términos y condiciones para obtener más información.
        </p>
      </div>
      <div className='formRegister'>
        <div className='errorContainerCart'>
          <input
            type='text'
            required
            className='input01_reg'
            placeholder='Nombre*'
            name='name'
            value={credentials.name}
            onChange={handleInput}
            style={{
              borderColor: validationFlags.name ? '#ed8067' : 'none',
              borderWidth: validationFlags.name ? '0.1px' : 'none',
              borderStyle: validationFlags.name ? 'solid' : 'none',
            }}
          />
          {validationFlags.name ? (
            <>
              {credentials.name.length <= 0 && (
                <span className='error'>{'Este campo es obligatorio'}</span>
              )}
            </>
          ) : null}
        </div>
        <div className='errorContainerCart'>
          <input
            type='text'
            required
            className='input02_reg'
            placeholder='Apellido*'
            name='lastName'
            value={credentials.lastName}
            onChange={handleInput}
            style={{
              borderColor: validationFlags.lastName ? '#ed8067' : 'none',
              borderWidth: validationFlags.lastName ? '0.1px' : 'none',
              borderStyle: validationFlags.lastName ? 'solid' : 'none',
            }}
          />
          {validationFlags.lastName ? (
            <>
              {credentials.lastName.length <= 0 && (
                <span className='error'>{'Este campo es obligatorio'}</span>
              )}
            </>
          ) : null}
        </div>
        <div className='errorContainerCart'>
          <input
            type='email'
            required
            className='input03_reg'
            placeholder='Correo electrónico*'
            name='email'
            value={credentials.email}
            onChange={handleInput}
            style={{
              borderColor: validationFlags.email ? '#ed8067' : 'none',
              borderWidth: validationFlags.email ? '0.1px' : 'none',
              borderStyle: validationFlags.email ? 'solid' : 'none',
            }}
          />
          {validationFlags.email ? (
            <>
              {credentials.email.length <= 0 && (
                <span className='error'>{'Este campo es obligatorio'}</span>
              )}
            </>
          ) : null}
        </div>
        <div className='errorContainerCart'>
          <input
            required
            className='input04_reg'
            placeholder='Telefono*'
            name='phoneNumber'
            onChange={handleInput}
            style={{
              borderColor: validationFlags.phone ? '#ed8067' : 'none',
              borderWidth: validationFlags.phone ? '0.1px' : 'none',
              borderStyle: validationFlags.phone ? 'solid' : 'none',
            }}
          />
          {validationFlags.name ? (
            <>
              {credentials.phoneNumber.length <= 0 && (
                <span className='error'>{'Este campo es obligatorio'}</span>
              )}
            </>
          ) : null}
        </div>
        <div className='errorContainerCart'>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            className='input05_reg'
            placeholder='Contraseña*'
            name='password'
            value={credentials.password}
            onChange={handleInput}
            style={{
              borderColor: validationFlags.password ? '#ed8067' : 'none',
              borderWidth: validationFlags.password ? '0.1px' : 'none',
              borderStyle: validationFlags.password ? 'solid' : 'none',
            }}
          />
          {validationFlags.password ? (
            <>
              {credentials.password.length <= 0 ? (
                <span className='error'>{'Este campo es obligatorio'}</span>
              ) : (
                <span className='error'>
                  {
                    'Requiere minimo 9 caracteres, una letra mayúscula, un número y un caracter especial.'
                  }
                </span>
              )}
            </>
          ) : null}
          {passwordMatchError && (
            <div className='errorContainerCart'>
              <span className='error'>Las contraseñas no coinciden</span>
            </div>
          )}
        </div>
        <div className='errorContainerCart'>
          <input
            type={showPasswordC ? 'text' : 'password'}
            required
            className='input06_reg'
            placeholder='Confirmar contraseña*'
            name='passwordConfirmation'
            value={credentials.passwordConfirmation}
            onChange={handleInput}
            style={{
              borderColor: validationFlags.passwordConfirmation
                ? '#ed8067'
                : 'none',
              borderWidth: validationFlags.passwordConfirmation
                ? '0.1px'
                : 'none',
              borderStyle: validationFlags.passwordConfirmation
                ? 'solid'
                : 'none',
            }}
          />
          {/* <FontAwesomeIcon
            className='passToggle2'
            icon={showPasswordC ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility2}
          /> */}
          {validationFlags.passwordConfirmation ? (
            <>
              {credentials.passwordConfirmation.length <= 0 && (
                <span className='error'>{'Este campo es obligatorio'}</span>
              )}
            </>
          ) : null}
          {passwordMatchError && (
            <div className='errorContainerCart'>
              <span className='error'>Las contraseñas no coinciden</span>
            </div>
          )}
        </div>
      </div>
      <p className='option_forgetPass'></p>
      <button className='option_btnSend' onClick={handleRegister}>
        Registrarse
      </button>
      <p className='option_info'>
        ¿Ya tenés una cuenta de Dreamon?
        <span onClick={() => setShowAction(true)}>Iniciá sesión</span>
      </p>
    </main>
  );
}
