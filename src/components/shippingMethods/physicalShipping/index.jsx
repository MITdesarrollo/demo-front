import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDreamOnDeliveryType, updatePackageSelect,
} from '@/redux/feature/counterSlice'
import {
  CreateDeliveryTypes,
  DeliveryTypeData,
  UpdateDeliveryTypeData,
} from '@/redux/feature/counterApi'

import './styles.scss'

export default function PhysicalShipping({ index }) {
  const shoppingCartInfo = useSelector((state) => state.counter.shoppingCart)
  const dreamOns = shoppingCartInfo.dreamOns
  const dreamonId = dreamOns[index]?.id
  const deliveryTypeId = dreamOns[index]?.deliveryType?.id

  const dreamonWithId = dreamOns[index]

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    type: 1,
    senderEmail: dreamonWithId?.info?.senderEmail || '',
    deliveryName: dreamonWithId?.info?.deliveryName || '',
    deliveryLastName: dreamonWithId?.info?.deliveryLastName || '',
    deliveryAddress: dreamonWithId?.info?.deliveryAddress || '',
    deliveryFloor: dreamonWithId?.info?.deliveryFloor || '',
    deliveryApartment: dreamonWithId?.info?.deliveryApartment || '',
    deliveryCity: dreamonWithId?.info?.deliveryCity || '',
    deliveryState: dreamonWithId?.info?.deliveryState || '',
    deliveryCountry: 'Argentina',
    deliveryZipCode: dreamonWithId?.info?.deliveryZipCode || '',
    deliveryPhone: dreamonWithId?.info?.deliveryPhone || '',
    deliveryCompany: dreamonWithId?.info?.deliveryCompany || '',
    deliveryForName: dreamonWithId?.info?.deliveryForName || '',
    deliveryFromName: dreamonWithId?.info?.deliveryFromName || '',
    deliveryMessage: dreamonWithId?.info?.deliveryMessage || '',
    deliveryEmail: dreamonWithId?.info?.deliveryEmail || '',
    deliveryDate: new Date().toISOString(),
    dreamOnId: dreamonId ? dreamonId : 0,
  });

  const [touchedFields, setTouchedFields] = useState([])
  const [saveChange, setSaveChange] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [formError, setFormError] = useState('')
  const MAX_CHARACTERS = 300

  useEffect(() => {
    if (deliveryTypeId) {
      const infoDelivery = async () => {
        try {
          const result = await DeliveryTypeData(deliveryTypeId)
          if (result) {
            updateFormData(result)
          }
        } catch (error) {
          console.error('Error fetching delivery type data:', error)
        }
      }
      infoDelivery()
    }
  }, [deliveryTypeId])

  const updateFormData = (result) => {
    if (!result) return
    setFormData((currentFormData) => ({
      ...currentFormData,
      id: result.id || currentFormData.id || 0,
      senderEmail: result.senderEmail || currentFormData.senderEmail,
      deliveryName: result.deliveryName || currentFormData.deliveryName,
      deliveryLastName: result.deliveryLastName || currentFormData.deliveryLastName,
      deliveryAddress: result.deliveryAddress || currentFormData.deliveryAddress,
      deliveryFloor: result.deliveryFloor || currentFormData.deliveryFloor,
      deliveryApartment: result.deliveryApartment || currentFormData.deliveryApartment,
      deliveryCity: result.deliveryCity || currentFormData.deliveryCity,
      deliveryState: result.deliveryState || currentFormData.deliveryState,
      deliveryZipCode: result.deliveryZipCode || currentFormData.deliveryZipCode,
      deliveryPhone: result.deliveryPhone || currentFormData.deliveryPhone,
      deliveryCompany: result.deliveryCompany || currentFormData.deliveryCompany,
      deliveryForName: result.deliveryForName || currentFormData.deliveryForName,
      deliveryFromName: result.deliveryFromName || currentFormData.deliveryFromName,
      deliveryMessage: result.deliveryMessage || currentFormData.deliveryMessage,
      deliveryEmail: result.deliveryEmail || currentFormData.deliveryEmail,
    }))
  }

  const newDelivery = async () => {
    try {
      console.log("Creando nuevo delivery para dreamonId:", dreamonId);
      console.log("Datos del formulario:", formData);

      const create = await CreateDeliveryTypes(dreamonId, [formData]);
      console.log("Respuesta de CreateDeliveryTypes:", create);

      if (create && create.created && create.created[0]) {
        const deliveryId = create.created[0];
        console.log("DeliveryId creado:", deliveryId);

        // Actualizamos el estado en Redux
        dispatch(
            setDreamOnDeliveryType({
              id: dreamonId,
              deliveryType: {
                id: deliveryId,
                type: formData.type,
              },
            })
        );

        // IMPORTANTE: Marcar este paquete como seleccionado/validado
        console.log("Marcando paquete como seleccionado en índice:", index);
        dispatch(updatePackageSelect({ index, value: true }));

        setSaveChange(true);
        setFormError('');

        return create;
      } else {
        console.error("No se pudo crear el delivery, respuesta inválida:", create);
        setFormError('No se pudo completar el registro. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error in newDelivery:', error);
      setFormError('Error al guardar los datos. Intente nuevamente.');
    }
    return null;
  };

  const updateDelivery = async () => {
    try {
      const result = await UpdateDeliveryTypeData(deliveryTypeId, formData)
      if (result) {
        dispatch(
            setDreamOnDeliveryType({
              id: dreamonId,
              deliveryType: {
                id: result.id || deliveryTypeId,
                type: result.type || formData.type,
              },
            })
        );

        updateFormData(result);
        setSaveChange(true);
        setFormError('');

        // Asegurarse de que el paquete esté marcado como seleccionado
        dispatch(updatePackageSelect({ index, value: true }));
      }
    } catch (error) {
      console.error('Error in updateDelivery:', error)
      setFormError('Error al actualizar los datos. Intente nuevamente.');
    }
  }

  const handleMessageChange = (event) => {
    const inputText = event.target.value
    if (inputText.length <= MAX_CHARACTERS) {
      setFormData({
        ...formData,
        deliveryMessage: inputText,
      })
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name])
    }
    setShowErrorMessage(false)
    setFormError('');
  }

  const isFieldRequired = (fieldName) => {
    const requiredFields = [
      'senderEmail',
      'deliveryName',
      'deliveryLastName',
      'deliveryState',
      'deliveryAddress',
      'deliveryZipCode',
      'deliveryCity',
    ]
    return requiredFields.includes(fieldName)
  }

  const isError = (fieldName) => {
    // Comprobar si es un campo obligatorio y está vacío
    // Si estamos intentando guardar (showErrorMessage es true) o el campo ya ha sido tocado
    return isFieldRequired(fieldName) && !formData[fieldName] &&
        (touchedFields.includes(fieldName) || showErrorMessage)
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSaveButtonClick = async () => {
    try {

      const requiredFields = [
        'senderEmail',
        'deliveryName',
        'deliveryLastName',
        'deliveryState',
        'deliveryAddress',
        'deliveryZipCode',
        'deliveryCity',
      ]
      setTouchedFields(requiredFields)
      setShowErrorMessage(true)


      const hasEmptyFields = requiredFields.some(fieldName => !formData[fieldName])


      const isEmailValid = validateEmail(formData.senderEmail)

      if (hasEmptyFields) {
        setFormError('Por favor complete todos los campos requeridos (*)');
        return;
      }

      if (!isEmailValid) {
        setFormError('Por favor ingrese un email válido');
        return;
      }

      await (!deliveryTypeId ? newDelivery() : updateDelivery())
    } catch (error) {
      console.error('Error saving:', error)
      setFormError('Error al guardar los datos. Intente nuevamente.');
    }
  }

  return (
      <main className='physicalShipping'>
        <h3 className='inputTitles' style={{ marginBottom: '7.43px' }}>
          Mail destinatario
          {saveChange && (
              <span
                  style={{
                    float: 'right',
                    fontSize: 11,
                    color: '#21c14b',
                    marginRight: '10px',
                  }}
              >
            Guardado
          </span>
          )}
        </h3>
        <input
            className={isError('senderEmail') ? 'inputserror' : 'inputs'}
            name='senderEmail'
            type='email'
            placeholder='Email*'
            value={formData.senderEmail}
            onChange={handleInputChange}
            required
        />

        <h3 className='inputTitles' style={{ marginBottom: '7.43px' }}>
          Dirección de envío destinatario
        </h3>
        <div className='inputsTwo'>
          <input
              className={isError('deliveryName') ? 'inputserror' : 'inputs'}
              style={{ width: '48.5%' }}
              name='deliveryName'
              type='text'
              placeholder='Nombre*'
              value={formData.deliveryName}
              onChange={handleInputChange}
              required
          />
          <input
              className={isError('deliveryLastName') ? 'inputserror' : 'inputs'}
              style={{ width: '48.5%' }}
              name='deliveryLastName'
              type='text'
              placeholder='Apellido*'
              value={formData.deliveryLastName}
              onChange={handleInputChange}
              required
          />
        </div>
        <input
            className={isError('deliveryState') ? 'inputserror' : 'inputs'}
            name='deliveryState'
            type='text'
            placeholder='Estado/Provincia*'
            value={formData.deliveryState}
            onChange={handleInputChange}
            required
        />
        <input
            className={isError('deliveryAddress') ? 'inputserror' : 'inputs'}
            name='deliveryAddress'
            type='text'
            placeholder='Dirección*'
            value={formData.deliveryAddress}
            onChange={handleInputChange}
            required
        />
        <div className='inputsTwo'>
          <input
              className='inputs'
              name='deliveryFloor'
              style={{ width: '48.5%' }}
              type='text'
              placeholder='Piso (opcional)'
              value={formData.deliveryFloor}
              onChange={handleInputChange}
          />
          <input
              className='inputs'
              name='deliveryApartment'
              style={{ width: '48.5%' }}
              type='text'
              placeholder='Depto (opcional)'
              value={formData.deliveryApartment}
              onChange={handleInputChange}
          />
        </div>
        <div className='inputsTwo'>
          <input
              className={isError('deliveryZipCode') ? 'inputserror' : 'inputs'}
              style={{ width: '48.5%' }}
              name='deliveryZipCode'
              type='text'
              placeholder='Código postal*'
              value={formData.deliveryZipCode}
              onChange={handleInputChange}
              required
          />
          <input
              className={isError('deliveryCity') ? 'inputserror' : 'inputs'}
              style={{ width: '48.5%' }}
              name='deliveryCity'
              type='text'
              placeholder='Localidad*'
              value={formData.deliveryCity}
              onChange={handleInputChange}
              required
          />
        </div>
        <input
            className='inputs'
            name='deliveryCompany'
            type='text'
            placeholder='Empresa (opcional)'
            value={formData.deliveryCompany}
            onChange={handleInputChange}
        />
        <input
            className='inputs'
            name='deliveryPhone'
            type='text'
            placeholder='Teléfono (opcional)'
            value={formData.deliveryPhone}
            onChange={handleInputChange}
        />

        <section className='physicalShipping_address'></section>
        <section className='physicalShipping_dedication'></section>

        <h3 className='inputTitles' style={{ marginBottom: '7.43px' }}>
          Escribí una dedicatoria
        </h3>
        <div className='inputsTwo'>
          <input
              className='inputs'
              name='deliveryForName'
              style={{ width: '48.5%' }}
              type='text'
              placeholder='Para (opcional)'
              value={formData.deliveryForName}
              onChange={handleInputChange}
          />
          <input
              className='inputs'
              name='deliveryFromName'
              style={{ width: '48.5%' }}
              type='text'
              placeholder='De (opcional)'
              value={formData.deliveryFromName}
              onChange={handleInputChange}
          />
        </div>
        <textarea
            className='inputsMessage'
            name='deliveryMessage'
            placeholder='Mensaje'
            value={formData.deliveryMessage}
            onInput={handleMessageChange}
        />
        <div className='shipping_confirm'>
          <p className='shipping_confirm_max'>
            {`${MAX_CHARACTERS - formData.deliveryMessage.length} caracteres restantes`}
          </p>
          <div className='shipping_confirm_btn'>
            <p className='shippingBtn_info'>*Estos campos son obligatorios</p>
            <button
                className='btnOrange'
                style={{ width: '150px' }}
                onClick={handleSaveButtonClick}
            >
              Guardar datos
            </button>
          </div>
        </div>
      </main>
  )
}
