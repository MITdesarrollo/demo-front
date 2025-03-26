import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CreateDeliveryTypes,
  DeliveryTypeData,
  UpdateDeliveryTypeData,
} from '@/redux/feature/counterApi'

import './styless.scss'
import {setDreamOnDeliveryType, setDreamonDraft, updatePackageSelect} from '@/redux/feature/counterSlice'

const SucursalShipping = forwardRef((props, ref) => {
  const { index, userData, style } = props
  const shoppingCartInfo = useSelector((state) => state.counter.shoppingCart)
  const dreamOns = shoppingCartInfo.dreamOns
  const dreamonId = dreamOns ? dreamOns[index]?.id : null;
  const deliveryTypeId = dreamOns ? dreamOns[index]?.deliveryType?.id : null;
  const draftData = shoppingCartInfo.draft
  const dreamonWithId = draftData?.find((dreamon) => dreamon.id === dreamonId)

  useImperativeHandle(ref, () => ({
    childMethod() {
      handleSaveButtonClick()
    },
  }))

  const dispatch = useDispatch()

  const userEmail =
      userData?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

  const [formData, setFormData] = useState({
    type: 3,
    senderEmail: dreamonWithId?.info?.senderEmail || userEmail || '',
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
    deliveryEmail: dreamonWithId?.info?.deliveryEmail || userEmail || '',
    deliveryDate: new Date().toISOString(),
    dreamOnId: dreamonId ? dreamonId : 0,
    deliveryBranchId: 1,
    deliveryBranch: null,
    dreamOn: null,
  })

  const updateFormData = useCallback((result) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: result.id || 0,
      senderEmail: result.senderEmail || '',
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
      deliveryBranchId: result.deliveryBranchId ?? 1,
      deliveryBranch: null,
      dreamOn: null,
    }))
  }, [])

  const [saveChange, setSaveChange] = useState(false)

  useEffect(() => {
    if (deliveryTypeId) {
      const infoDelivery = async () => {
        try {
          const result = await DeliveryTypeData(deliveryTypeId)
          updateFormData(result)
        } catch (error) {
          console.error('Error fetching delivery type data:', error)
        }
      }
      infoDelivery()
    }
  }, [deliveryTypeId, updateFormData])

  const newDelivery = async () => {
    try {
      const create = await CreateDeliveryTypes(dreamonId, [formData]);

      if (create && create.created && create.created[0]) {
        const deliveryId = create.created[0];


        dispatch(
            setDreamOnDeliveryType({
              id: dreamonId,
              deliveryType: {
                id: deliveryId,
                type: formData.type,
              },
            })
        );


        dispatch(updatePackageSelect({ index, value: true }));

        setSaveChange(true);


        const updatedData = await DeliveryTypeData(deliveryId);
        updateFormData(updatedData);

        return create;
      }
    } catch (error) {
      console.error('Error in newDelivery:', error);
    }
    return null;
  };

  const updateDelivery = async () => {
    try {
      const update = await UpdateDeliveryTypeData(deliveryTypeId, formData);
      if (update) {
        const result = await DeliveryTypeData(deliveryTypeId);


        dispatch(
            setDreamOnDeliveryType({
              id: dreamonId,
              deliveryType: {
                id: result.id,
                type: formData.type,
              },
            })
        );


        dispatch(updatePackageSelect({ index, value: true }));

        updateFormData(result);
        setSaveChange(true);
      }
    } catch (error) {
      console.error('Error in updateDelivery:', error);
    }
  };

  const handleSaveButtonClick = async () => {
    try {
      if (!dreamonId) {
        console.error("No dreamonId found");
        return;
      }

      const sendDataDelivery = !deliveryTypeId ? await newDelivery() : await updateDelivery();

      if (sendDataDelivery && sendDataDelivery.created && sendDataDelivery.created.length > 0) {
        const dataDraftDreamon = await DeliveryTypeData(sendDataDelivery.created[0]);
        dispatch(
            setDreamonDraft([
              {
                id: dreamonId,
                draftId: sendDataDelivery.created[0],
                info: dataDraftDreamon,
              },
            ])
        );
      }
    } catch (error) {
      console.error("Error in handleSaveButtonClick:", error);
    }
  }

  return (
      <div className='sucursalShipping' style={style}>
        <div>
        <span
            className='sucursalOption'
            style={{ marginBottom: '7.43px', color: '#262633' }}
        >
          Podes retirar tu Dreamon Box en nuestra sucursal:
        </span>
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
        </div>
        <p className='sucursalOption' style={{ marginBottom: '7.43px' }}>
          Av. Juramento 1805 Piso 5 Dpto B. Belgrano. CABA.
        </p>
        <p className='sucursalOption' style={{ marginBottom: '7.43px' }}>
          {' '}
          Legajo 13648 Horario Lunes a Viernes de 9.30hs a 13hs y de 14hs a
          18.30hs
        </p>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
              className='btnOrange'
              style={{ width: '150px' }}
              onClick={handleSaveButtonClick}
          >
            Guardar datos
          </button>
        </div>
      </div>
  )
})

SucursalShipping.displayName = 'SucursalShipping'
export default SucursalShipping
