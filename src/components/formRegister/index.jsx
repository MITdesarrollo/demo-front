import { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { registerUser } from '@/utils/auth'

import './styles.scss'

export default function RegisterUser({
  setState,
  setShowSuccess,
  setForgetPass,
  setUserAlreadyExist,
}) {
  const logoDreamon = process.env.apiLogoMedium

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordC, setShowPasswordC] = useState(false)
  const [passwordMatchError, setPasswordMatchError] = useState(false)

  const errorText = {
    errorRequiret: 'Este campo es obligatorio',
    errorPass01:
      'Requiere minimo 9 caracteres, una letra mayúscula, un número y un caracter especial.',
    errorPass02: 'Las contraseñas no coinciden',
    errorEmail: 'Introduce un email valido',
  }

  const [validationFlags, setValidationFlags] = useState({
    name: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    passwordConfirmation: false,
  })

  const [credentials, setCredentials] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
  })

  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordVisibility2 = () => {
    setShowPasswordC(!showPasswordC)
  }

  const handleInput = (event) => {
    const { name, value } = event.target

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))

    setValidationFlags((prevFlags) => ({
      ...prevFlags,
      [name]: false, // Reset the validation flag when input changes
    }))
  }

  const handleBack = () => {
    setState(true)
    setForgetPass(false)
  }

  const handleRegister = async () => {
    if (credentials.password !== credentials.passwordConfirmation) {
      setPasswordMatchError(true)
      return
    }

    try {
      const newUser = await registerUser(credentials, setValidationFlags)

      if (newUser.errors.length > 0) {
        return setUserAlreadyExist(true)
      }

      if (newUser) {
        setCredentials({
          name: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          passwordConfirmation: '',
        })
        setShowSuccess(true)
        setState(true)
        setForgetPass(false)
      }

      setPasswordMatchError(false)
    } catch (error) {
      console.error('Error registering user:', error)
      // Handle error appropriately, e.g., set an error state
    }
    return false
  }

  const passwordInput = (
    <input
      type={showPassword ? 'text' : 'password'}
      required
      className='inputPass'
      placeholder='Contraseña*'
      autoComplete='new-password'
      name='password'
      value={credentials.password}
      onChange={handleInput}
      style={{
        borderColor: validationFlags.password ? '#ed8067' : 'none',
        borderWidth: validationFlags.password ? '0.1px' : 'none',
        borderStyle: validationFlags.password ? 'solid' : 'none',
      }}
    />
  )

  const showPasswordCInput = (
    <input
      type={showPasswordC ? 'text' : 'password'}
      required
      className='inputPassVerification'
      placeholder='Confirmar contraseña*'
      name='passwordConfirmation'
      value={credentials.passwordConfirmation}
      onChange={handleInput}
      style={{
        borderColor: validationFlags.passwordConfirmation ? '#ed8067' : 'none',
        borderWidth: validationFlags.passwordConfirmation ? '0.1px' : 'none',
        borderStyle: validationFlags.passwordConfirmation ? 'solid' : 'none',
      }}
    />
  )

  const eyeIcon = (
    <FontAwesomeIcon
      className='passwordToggle1'
      icon={showPassword ? faEyeSlash : faEye}
      onClick={togglePasswordVisibility1}
    />
  )

  const eyeIcon2 = (
    <FontAwesomeIcon
      className='passwordToggle2'
      icon={showPasswordC ? faEyeSlash : faEye}
      onClick={togglePasswordVisibility2}
    />
  )

  const errorContainerStyle = {
    ...(credentials.password.length > 0 &&
      window.innerWidth < 768 && {
        width: '250px',
        height: '60px',
        paddingLeft: '10px',
        right: '46px',
      }),
    ...(credentials.password.length > 0 && {
      width: '250px',
      height: '60px',
      paddingLeft: '10px',
    }),
  }

  return (
    <main className='registerUser'>
      {window.innerWidth > 768 ? (
        <div className='logoDreamon'>
          <Image
            alt='logoDreamon'
            src={logoDreamon}
            width={168}
            height={27.09}
          />
        </div>
      ) : null}
      <h3 className='title'>Registrate</h3>
      {window.innerWidth > 768 ? <div className='separator'></div> : null}
      <p className='subTitle'>
        Mantenemos tus datos completamente privados. Consulte nuestros términos
        y condiciones para obtener más información.
      </p>
      <div className='inputContainer'>
        <div className='inputNombreCompleto'>
          <input
            type='text'
            required
            className='inputNombre'
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
            <div
              className={`errorContainer${
                window.innerWidth > 768 ? 'Left' : ''
              }`}
            >
              {credentials.name.length <= 0 && (
                <span className='error'>{errorText.errorRequiret}</span>
              )}
            </div>
          ) : null}
          <input
            type='text'
            required
            className='inputApellido'
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
            <div className='errorContainer'>
              {credentials.lastName.length <= 0 && (
                <span className='error'>{errorText.errorRequiret}</span>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputEmailPhone'>
          <input
            type='email'
            required
            className='inputEmail'
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
            <div className='errorContainerLeft'>
              {credentials.email.length <= 0 ? (
                <span className='error'>{errorText.errorRequiret}</span>
              ) : (
                <span className='error'>{errorText.errorEmail}</span>
              )}
            </div>
          ) : null}
          <input
            type='text'
            className='inputPhone'
            placeholder='541130978554'
            name='phoneNumber'
            value={credentials.phoneNumber}
            onChange={handleInput}
            style={{
              borderColor: validationFlags.phoneNumber ? '#ed8067' : 'none',
              borderWidth: validationFlags.phoneNumber ? '0.1px' : 'none',
              borderStyle: validationFlags.phoneNumber ? 'solid' : 'none',
            }}
          />
          {/* {validationFlags.phoneNumber ? (
            <div className='errorContainer'>
              {credentials.phoneNumber.length <= 0 && (
                <span className='error'>{errorText.errorRequiret}</span>
              )}
            </div>
          ) : null} */}
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputSetPass'>
          {window.innerWidth < 768 ? (
            <div className='inputPassContainer'>
              {passwordInput}
              {eyeIcon}
            </div>
          ) : (
            <>
              {passwordInput}
              {eyeIcon}
            </>
          )}
          {validationFlags.password ? (
            <div
              className={`errorContainer${
                window.innerWidth > 768 ? 'Left' : ''
              }`}
              style={errorContainerStyle}
            >
              {credentials.password.length <= 0 ? (
                <span className='error'>{errorText.errorRequiret}</span>
              ) : (
                <span className='error'>{errorText.errorPass01}</span>
              )}
            </div>
          ) : null}
          {passwordMatchError && (
            <div
              className={`errorContainer${
                window.innerWidth > 768 ? 'Left' : ''
              }`}
            >
              <span className='error'>{errorText.errorPass02}</span>
            </div>
          )}
          {window.innerWidth < 768 ? (
            <div className='inputPassContainer'>
              {showPasswordCInput}
              {eyeIcon2}
            </div>
          ) : (
            <>
              {showPasswordCInput}
              {eyeIcon2}
            </>
          )}
          {validationFlags.passwordConfirmation ? (
            <div
              className={`errorContainer${
                window.innerWidth > 768 ? 'Left' : ''
              }`}
              style={
                credentials.passwordConfirmation.length <= 0
                  ? null
                  : { width: '250px', height: '60px', paddingLeft: '10px' }
              }
            >
              {credentials.passwordConfirmation.length <= 0 ? (
                <span className='error'>{errorText.errorRequiret}</span>
              ) : (
                <span className='error'>{errorText.errorPass01}</span>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <button className='btnEnter' onClick={handleRegister}>
        Registrarse
      </button>
      <p className='register'>
        ¿Ya tenés una cuenta de Dreamon?{' '}
        <span
          style={{ color: '#ecbf52', cursor: 'pointer' }}
          onClick={handleBack}
        >
          Iniciá sesión
        </span>
      </p>
    </main>
  )
}
