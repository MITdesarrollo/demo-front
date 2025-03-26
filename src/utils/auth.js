import jwt from 'jsonwebtoken';
import { LoginUserDreamon, RegisterNewUser } from '@/redux/feature/counterApi';

// LoginUser ->
export const loginUser = async (
  credentials,
  setRequiredEmail,
  setRequiredPass,
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = credentials.email.match(emailRegex);

  const areFieldsValid =
    credentials.email.length > 0 && credentials.password.length > 0;

  setRequiredEmail(!isEmailValid);
  setRequiredPass(!areFieldsValid);

  if (isEmailValid && areFieldsValid) {
    try {
      return LoginUserDreamon(credentials);
    } catch (error) {
      console.error('🚀 ~ Error en la llamada a LoginUserDreamon:', error);
    }
  }
};
// <-

// -> JWT
export const getAuthToken = () => {
  return localStorage.getItem('userToken');
};

export const decodeToken = async (token) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decodedToken = jwt.decode(token);
    // const decodedToken = jwt.verify(token, secretKey);

    return decodedToken;
  } catch (error) {
    console.error('🚀 ~ Error al decodificar el token:', error.message);
    console.error('🚀 ~ Stack trace:', error.stack);
    return null;
  }
};
// <-

// RegisterUser ->
// Requiere al menos 9 caracteres, una letra mayúscula, un número y un caracter especial
const hasUpperCaseLetter = (str) => /[A-Z]/.test(str);
const hasNumber = (str) => /\d/.test(str);
const hasSpecialCharacter = (str) => /[@$!%*?&]/.test(str);

export const isPasswordValid = (password) => {
  const isLengthValid = password.length >= 9;
  const containsUpperCase = hasUpperCaseLetter(password);
  const containsNumber = hasNumber(password);
  const containsSpecialCharacter = hasSpecialCharacter(password);

  return (
    isLengthValid &&
    containsUpperCase &&
    (containsNumber || containsSpecialCharacter)
  );
};

export const registerUser = async (credentials, setValidationFlags) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isNameValid = credentials.name.trim().length >= 1;
  const isLastnameValid = credentials.lastName.trim().length >= 1;
  const isEmailValid = credentials.email.match(emailRegex);
  const isPassValid = isPasswordValid(credentials.password);
  const isPhoneValid = credentials.phoneNumber.trim().length >= 1;

  setValidationFlags((prevFlags) => ({
    ...prevFlags,
    name: !isNameValid,
    lastName: !isLastnameValid,
    email: !isEmailValid,
    password: !isPassValid,
    phoneNumber: !isPhoneValid,
  }));

  if (
    credentials.password === credentials.passwordConfirmation &&
    isPasswordValid(credentials.password)
  ) {
    const registerStatus = await RegisterNewUser(credentials);
    if (!registerStatus.succeeded) {
      console.log('🚀 ~ error: ', registerStatus.errors[1]?.description);
    }
    return registerStatus;
  } else {
    console.log(
      '🚀 ~ Verifique que los datos esten completos y cumplan con los requisitos'
    );
  }
};
// <- RegisterUser
