import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ResetPassword, UpdateProfile } from '@/redux/feature/counterApi';
import { Switch } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@/redux/feature/counterSlice';

import './styles.scss';

export default function EditProfile({ setEditForm, profileData }) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPass: false,
    confirmPass: false,
  });

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prevData) => ({
      ...prevData,
      [fieldName]: !prevData[fieldName],
    }));
  };

  const dispatch = useDispatch();

  const userEmail =
    profileData?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

  const [formData, setFormData] = useState({
    name: profileData?.FirstName || '',
    lastName: profileData?.LastName || '',
    email: userEmail || '',
    phoneNumber: profileData?.MobilePhone || '',
    country: profileData?.Country || '',
    stateOrProvince: profileData?.StateOrProvince || '',
    birthDate: profileData?.DateOfBirth || '',
    gender: profileData?.Gender || '',
  });

  const [formDataPass, setFormDataPass] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [changePass, setChangePass] = useState(false);

  const handleChangePass = () => {
    setChangePass(!changePass);
    setFormDataPass({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormDataPass((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSaveChanges = async () => {
    // Perform your validation logic here
    const newErrors = {};

    // Check required fields
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        key !== 'currentPassword' &&
        key !== 'newPassword' &&
        key !== 'confirmPassword'
      ) {
        newErrors[key] = 'Campo requerido';
      }
    });

    // Validate password fields if at least one is not empty
    if (
      formDataPass.currentPassword ||
      formDataPass.newPassword ||
      formDataPass.confirmPassword
    ) {
      if (!formDataPass.currentPassword) {
        newErrors.currentPassword = 'Campo requerido';
      }
      if (!formDataPass.newPassword) {
        newErrors.newPassword = 'Campo requerido';
      }
      if (!formDataPass.confirmPassword) {
        newErrors.confirmPassword = 'Campo requerido';
      }

      // Check if newPassword and confirmPassword match
      if (formDataPass.newPassword !== formDataPass.confirmPassword) {
        newErrors.confirmPassword = 'La nueva contraseña no coincide';
      }
    }

    if (Object.keys(newErrors).length === 0) {
      // All required fields are filled, proceed with saving changes

      // Call UpdateProfile function
      const updateProfileSuccess = await UpdateProfile(formData);

      if (updateProfileSuccess) {
        const newUserInfo = {
          FirstName: updateProfileSuccess.name,
          LastName: updateProfileSuccess.lastName,
          MobilePhone: updateProfileSuccess.phoneNumber,
          Country: updateProfileSuccess.country,
          StateOrProvince: updateProfileSuccess.stateOrProvince,
          DateOfBirth: updateProfileSuccess.birthDate,
          Gender: updateProfileSuccess.gender,
          email: updateProfileSuccess.email,
        };
        dispatch(updateUserInfo(newUserInfo));
        setEditForm(false);
        // Aquí puedes realizar cualquier otra acción que desees
      } else {
        console.error('Error updating profile');
      }

      // Additional validation for newPassword and confirmPassword
      if (
        formDataPass.currentPassword &&
        formDataPass.newPassword &&
        formDataPass.confirmPassword &&
        formDataPass.newPassword === formDataPass.confirmPassword
      ) {
        // Call ResetPassword function
        const resetPasswordSuccess = await ResetPassword(
          formData.email,
          formDataPass.newPassword
        );

        if (resetPasswordSuccess) {
          console.log('Password reset successfully');
        } else {
          console.error('Error resetting password');
        }
      }
    } else {
      // Some required fields are missing or passwords don't match, update errors state
      setErrors(newErrors);
    }
  };

  // ...

  return (
    <main className='editProfile'>
      <section className='editProfile_section'>
        <h2 style={{ fontSize: '23px', marginBottom: '20px', fontWeight: 500 }}>
          Editá tus datos
        </h2>
        <div className='inputsTwo'>
          <input
            type='text'
            className={`inputs${errors.name ? 'error' : ''}`}
            placeholder='Nombre completo*'
            name='name'
            style={{ width: window.innerWidth > 768 && '48.5%' }}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            className={`inputs${errors.lastName ? 'error' : ''}`}
            placeholder='Apellido*'
            name='lastName'
            style={{ width: window.innerWidth > 768 && '48.5%' }}
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type='text'
          className={`inputs${errors.email ? 'error' : ''}`}
          placeholder='Correo electrónico*'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type='text'
          className={`inputs${errors.phoneNumber ? 'error' : ''}`}
          placeholder='Número de teléfono*'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <div className='inputsTwo'>
          <input
            type='text'
            className={`inputs${errors.country ? 'error' : ''}`}
            placeholder='País*'
            name='country'
            style={{ width: window.innerWidth > 768 && '48.5%' }}
            value={formData.country}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            className={`inputs${errors.stateOrProvince ? 'error' : ''}`}
            placeholder='Estado*'
            name='stateOrProvince'
            style={{ width: window.innerWidth > 768 && '48.5%' }}
            value={formData.stateOrProvince}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='inputsTwo'>
          <input
            type='date'
            className={`inputs${errors.birthDate ? 'error' : ''}`}
            placeholder='Fecha de nacimiento*'
            name='birthDate'
            style={{ width: window.innerWidth > 768 && '48.5%' }}
            value={formData.birthDate ? formData.birthDate.slice(0, 10) : ''}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            className={`inputs${errors.gender ? 'error' : ''}`}
            placeholder='Genero*'
            name='gender'
            style={{ width: window.innerWidth > 768 && '48.5%' }}
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='changePass_switch'>
          <h2>Cambiar clave</h2>
          <Switch
            color={!changePass ? 'neutral' : 'success'}
            variant='solid'
            sx={{
              '--Switch-trackHeight': '10px',
              '--Switch-trackWidth': '23px',
              '--Switch-thumbSize': '10px',
            }}
            onChange={handleChangePass}
          />
        </div>
        <div className='inputsTwo'>
          <div
            style={{
              width: window.innerWidth > 768 ? '48.5%' : '100%',
              flexDirection: window.innerWidth > 768 ? 'column' : 'row',
            }}
          >
            <input
              type={showPassword.current ? 'text' : 'password'}
              className={`inputs${errors.currentPassword ? 'error' : ''}`}
              placeholder='Contraseña actual*'
              style={{ width: '100%' }}
              name='currentPassword'
              value={formDataPass.currentPassword}
              onChange={handleInputChange}
              disabled={!changePass}
            />
            <FontAwesomeIcon
              className='passwordToggle1'
              icon={showPassword.current ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('current')}
            />
          </div>
          <div
            style={{
              width: window.innerWidth > 768 ? '48.5%' : '100%',
              flexDirection: window.innerWidth > 768 ? 'column' : 'row',
            }}
          >
            <input
              type={showPassword.newPass ? 'text' : 'password'}
              className={`inputs${errors.newPassword ? 'error' : ''}`}
              placeholder='Nueva contraseña*'
              style={{ width: '100%' }}
              name='newPassword'
              value={formDataPass.newPassword}
              onChange={handleInputChange}
              disabled={!changePass}
            />
            <FontAwesomeIcon
              className='passwordToggle2'
              icon={showPassword.newPass ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('newPass')}
            />
            {/* {errors.newPassword && (
            <p className='error-message'>{errors.newPassword}</p>
          )} */}
          </div>
        </div>
        <div style={{ width: '100%', flexDirection: 'column' }}>
          <input
            type={showPassword.confirmPass ? 'text' : 'password'}
            className={`inputs${errors.confirmPassword ? 'error' : ''}`}
            placeholder='Confirmar nueva contraseña*'
            name='confirmPassword'
            value={formDataPass.confirmPassword}
            onChange={handleInputChange}
            disabled={!changePass}
          />
          <FontAwesomeIcon
            className='passwordToggle3'
            icon={showPassword.confirmPass ? faEyeSlash : faEye}
            onClick={() => togglePasswordVisibility('confirmPass')}
          />
        </div>
        {/* {errors.confirmPassword && (
          <p className='error-message'>{errors.confirmPassword}</p>
        )} */}
        <div className='editProfile_btn'>
          <button
            className='btnOrange'
            style={{
              height: window.innerWidth > 768 ? '43px' : '50px',
              width: window.innerWidth > 768 && '48.5%',
              margin: window.innerWidth <= 768 && '30px 0 20px 0',
            }}
            onClick={() => setEditForm(false)}
          >
            Cancelar
          </button>
          <button
            className='btnRadien'
            style={{
              width: window.innerWidth > 768 && '48.5%',
              height: window.innerWidth > 768 ? '43px' : '50px',
            }}
            onClick={handleSaveChanges}
          >
            Guardar cambios
          </button>
        </div>
      </section>
    </main>
  );
}
