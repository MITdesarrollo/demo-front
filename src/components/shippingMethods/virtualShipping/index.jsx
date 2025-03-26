import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CreateDeliveryTypes,
  DeliveryTypeData,
  UpdateDeliveryTypeData,
} from '@/redux/feature/counterApi'

import './styless.scss'
import { setDreamOnDeliveryType } from '@/redux/feature/counterSlice'

export default function VirtualShipping({ index, userData }) {
  const shoppingCartInfo = useSelector((state) => state.counter.shoppingCart)

  const [showFormError, setShowFormError] = useState(false)

  const [sendToEmail, setSendToEmail] = useState(false)

  const dreamOns = shoppingCartInfo.dreamOns
  const dreamonId = dreamOns[index].id
  const deliveryTypeId = dreamOns[index]?.deliveryType?.id
  const draftData = shoppingCartInfo.draft
  const dreamonWithId = draftData?.find((dreamon) => dreamon.id === dreamonId)

  const userEmail = useSelector((state) => state.counter.user.email)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    type: 2,
    senderEmail: userEmail || '',
    deliveryName: dreamonWithId?.info.deliveryName || '',
    deliveryLastName: dreamonWithId?.info.deliveryLastName || '',
    deliveryAddress: dreamonWithId?.info.deliveryAddress || '',
    deliveryFloor: dreamonWithId?.info.deliveryFloor || '',
    deliveryApartment: dreamonWithId?.info.deliveryApartment || '',
    deliveryCity: dreamonWithId?.info.deliveryCity || '',
    deliveryState: dreamonWithId?.info.deliveryState || '',
    deliveryCountry: 'Argentina',
    deliveryZipCode: dreamonWithId?.info.deliveryZipCode || '',
    deliveryPhone: dreamonWithId?.info.deliveryPhone || '',
    deliveryCompany: dreamonWithId?.info.deliveryCompany || '',
    deliveryForName: dreamonWithId?.info.deliveryForName || '',
    deliveryFromName: dreamonWithId?.info.deliveryFromName || '',
    deliveryMessage: dreamonWithId?.info.deliveryMessage || '',
    deliveryEmail: dreamonWithId?.info.deliveryEmail || '',
    deliveryDate: new Date().toISOString(),
    dreamOnId: dreamonId ? dreamonId : 0,
    deliveryBranchId: null,
    deliveryBranch: null,
    dreamOn: null,
  })

  const updateFormData = (result) => {
    setFormData({
      ...formData,
      id: result.id || 0,
      senderEmail: userEmail,
      deliveryName: result.deliveryName || '',
      deliveryLastName: result.deliveryLastName || '',
      deliveryAddress: result.deliveryAddress || '',
      deliveryFloor: result.deliveryFloor || '',
      deliveryApartment: result.deliveryApartment || '',
      deliveryCity: result.deliveryCity || '',
      deliveryState: result.deliveryState || '',
      deliveryZipCode: result.deliveryZipCode || '',
      deliveryPhone: result.deliveryPhone || '',
      deliveryCompany: result.deliveryCompany || '',
      deliveryForName: result.deliveryForName || '',
      deliveryFromName: result.deliveryFromName || '',
      deliveryMessage: result.deliveryMessage || '',
      deliveryEmail: result.deliveryEmail || '',
      deliveryBranchId: null,
      deliveryBranch: null,
      dreamOn: null,
    })
  }

  const emptyFormState = {
    type: 2,
    senderEmail: userEmail || '',
    deliveryName: '',
    deliveryLastName: '',
    deliveryAddress: '',
    deliveryFloor: '',
    deliveryApartment: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryCountry: 'Argentina',
    deliveryZipCode: '',
    deliveryPhone: '',
    deliveryCompany: '',
    deliveryForName: '',
    deliveryFromName: '',
    deliveryMessage: '',
    deliveryEmail: '',
    deliveryDate: new Date().toISOString(),
    dreamOnId: dreamonId ? dreamonId : 0,
    deliveryBranchId: null,
    deliveryBranch: null,
    dreamOn: null,
  }

  const [touchedFields, setTouchedFields] = useState([])
  const [saveChange, setSaveChange] = useState(false)
  const MAX_CHARACTERS = 300

  const requiredFieldsOtherReceiver = [
    'deliveryEmail',
    'deliveryName',
    'deliveryDate',
    'deliveryDate',
  ]

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

    setSaveChange(false)

    // Si el campo es 'deliveryDate' o 'dept', cambia el formato según corresponda
    if (name === 'deliveryDate') {
      const selectedDate = new Date(value)
      const isoDateString = selectedDate.toISOString()
      setFormData({
        ...formData,
        [name]: isoDateString,
      })
    } else if (name === 'dept') {
      // Para el campo 'dept' (hora), concatena la hora con la fecha actual
      const selectedTime = value
      const isoDateTimeString = `${
        formData.deliveryDate.split('T')[0]
      }T${selectedTime}:00.000Z`
      setFormData({
        ...formData,
        deliveryDate: isoDateTimeString,
      })
    } else {
      // Para otros campos, simplemente actualiza el valor en el estado
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    // Marca el campo como tocado si aún no ha sido tocado
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name])
    }
  }

  const isError = (fieldName) => {
    // Verificar si el campo está vacío y ha sido tocado
    // return showFormError && touchedFields.includes(fieldName) && !formData[fieldName];
    return showFormError && !formData[fieldName]
  }

  useEffect(() => {
    if (touchedFields) {
      const infoDelivery = async () => {
        const result = await DeliveryTypeData(deliveryTypeId) // Asegúrate de que DeliveryTypeData esté definida
        updateFormData(result)
      }
      infoDelivery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToEmail])

  const newDelivery = async () => {
    try {
      const create = await CreateDeliveryTypes(dreamonId, [formData]);

      if (create && create[0]) {  // Si tenemos un ID
        const deliveryId = create[0];

        const result = await DeliveryTypeData(deliveryId);

        dispatch(setDreamOnDeliveryType({
          id: dreamonId,
          deliveryType: {
            id: deliveryId,
            ...result
          }
        }));

        setSaveChange(true);
        return create;
      }
    } catch (error) {
      console.error('Error in newDelivery:', error);
    }
    return null;
  };

  const updateDelivery = async () => {
    const update = await UpdateDeliveryTypeData(deliveryTypeId, formData)

    if (update) {
      const result = await DeliveryTypeData(deliveryTypeId)
      updateFormData(result)
      setSaveChange(true)
    }
  }

  const handleSaveButtonClick = async () => {
    const requiredFields = sendToEmail ? requiredFieldsOtherReceiver : []

    if (requiredFields.length > 0) {
      const hasError = requiredFields.some((field) => !formData[field])
      if (hasError) {
        setShowFormError(true)
        return
      }
    }

    const sendDataDelivery = !deliveryTypeId ? newDelivery() : updateDelivery()

    if (sendDataDelivery?.length > 0) {
      const dataDraftDreamon = await DeliveryTypeData(sendDataDelivery[0])
      dispatch(
        setDreamonDraft([
          {
            id: dreamonId,
            draftId: sendDataDelivery[0],
            info: dataDraftDreamon,
          },
        ])
      )
    }
  }

  return (
    <main className='virtualShipping'>
      <h3 className='inputTitles' style={{ marginBottom: '7.43px' }}>
        Modo de entrega
      </h3>
      <div className='virtualShipping_checkbox'>
        <label className='checkbox'>
          <input
            className='checkbox_input'
            type='checkbox'
            checked={!sendToEmail}
            onChange={() => {
              setSendToEmail(false)
              setFormData(emptyFormState)
            }}
          />
          Enviar a mi email
        </label>
      </div>
      <div
        className='virtualShipping_checkbox'
        style={{ justifyContent: 'space-between' }}
      >
        <label className='checkbox'>
          <input
            className='checkbox_input'
            type='checkbox'
            checked={sendToEmail}
            onChange={() => setSendToEmail(true)}
          />
          Otro destinatario
        </label>
        <p className='virtualShipping_checkbox_infoText'>
          {saveChange && (
            <span style={{ color: '#21c14b', marginRight: '10px' }}>
              Guardado
            </span>
          )}
          Posibilidad de programar envío
        </p>
      </div>
      <div className='inputsTwo'>
        <input
          className={`inputs${isError('deliveryEmail') ? 'error' : ''}`}
          name='deliveryEmail'
          style={{ width: '48.5%' }}
          type='email'
          placeholder='Email*'
          value={formData.deliveryEmail}
          onChange={handleInputChange}
          required
          disabled={!sendToEmail}
        />
        <input
          className={`inputs${isError('deliveryName') ? 'error' : ''}`}
          name='deliveryName'
          style={{ width: '48.5%' }}
          type='text'
          placeholder='De parte de*'
          value={formData.deliveryName}
          onChange={handleInputChange}
          required
          disabled={!sendToEmail}
        />
      </div>
      <div className='inputsTwo'>
        <input
          className={`inputs${isError('deliveryDate') ? 'error' : ''}`}
          name='deliveryDate'
          style={{ width: '48.5%' }}
          type='date'
          placeholder='Fecha de entrega*'
          value={
            formData.deliveryDate ? formData.deliveryDate.split('T')[0] : ''
          }
          onChange={handleInputChange}
          required
          disabled={!sendToEmail}
        />
        <input
          className={`inputs${isError('deliveryDate') ? 'error' : ''}`}
          name='dept'
          style={{ width: '48.5%' }}
          type='time'
          placeholder='Hora*'
          value={
            formData.deliveryDate
              ? formData.deliveryDate.split('T')[1].slice(0, 5)
              : ''
          }
          onChange={handleInputChange}
          required
          disabled={!sendToEmail}
        />
      </div>
      <h3 className='inputTitles' style={{ marginBottom: '7.43px' }}>
        Escribí una dedicatoria
      </h3>
      <div className='inputsTwo'>
        <input
          className={`inputs${isError('deliveryForName') ? 'error' : ''}`}
          name='deliveryForName'
          style={{ width: '48.5%' }}
          type='text'
          placeholder='Para (opcional)'
          value={formData.deliveryForName}
          onChange={handleInputChange}
          disabled={!sendToEmail}
        />
        <input
          className={`inputs${isError('deliveryFromName') ? 'error' : ''}`}
          name='deliveryFromName'
          style={{ width: '48.5%' }}
          type='text'
          placeholder='De (opcional)'
          value={formData.deliveryFromName}
          onChange={handleInputChange}
          disabled={!sendToEmail}
        />
      </div>
      <textarea
        className={`inputsMessage inputs${
          isError('deliveryMessage') ? 'error' : ''
        }`}
        name='deliveryMessage'
        placeholder='Mensaje'
        value={formData.deliveryMessage}
        onInput={handleMessageChange}
        disabled={!sendToEmail}
      />
      <div className='shipping_confirm'>
        <p className='shipping_confirm_max'>{`${
          MAX_CHARACTERS - formData.deliveryMessage.length
        } caracteres restantes`}</p>
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
