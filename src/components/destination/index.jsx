import { useEffect, useRef, useState } from 'react'
import PhysicalShipping from '../shippingMethods/physicalShipping'
import VirtualShipping from '../shippingMethods/virtualShipping'
import SucursalShipping from '../shippingMethods/sucursalShipping'
import { useDispatch, useSelector } from 'react-redux'
import { updatePackageSelect } from '@/redux/feature/counterSlice'

import './styles.scss'

export default function Destination({ index, dreamonWithId, dreamonId }) {
  const childRef = useRef(null)
  const dispatch = useDispatch()
  const shoppingCartInfo = useSelector((state) => state.counter.shoppingCart)
  const dreamOns = shoppingCartInfo?.dreamOns || []
  const dreamOn = dreamOns ? dreamOns[index] : null

  const userAviable = useSelector((state) => state.counter.user)

  const [deliveryTypeId, setDeliveryTypeId] = useState(
    dreamOn?.deliveryType?.type
  )

  useEffect(() => {
    dispatch(updatePackageSelect({ index, value: !!deliveryTypeId }))
  }, [deliveryTypeId])

  const handleToggleCheckboxes = (deliveryId) => {
    setDeliveryTypeId(deliveryId)
  }

  const handleClickOnChildComponent = () => {
    // execute function that executes a function from the child component
    setTimeout(() => {
      if (childRef.current) {
        childRef.current.childMethod()
      }
    }, 0)
  }

  return (
    <main>
      <section className='physic'>
        <div className='destination_physic'>
          <label
            className='checkbox'
            style={!userAviable.login ? { color: '#e4e3e2' } : null}
          >
            <input
              className='checkbox_input'
              type='checkbox'
              checked={deliveryTypeId === 1}
              onChange={(ev) => {
                const isChecked = ev.target.checked
                handleToggleCheckboxes(isChecked ? 1 : null)
              }}
              disabled={!userAviable.login}
              style={!userAviable.login ? { borderColor: '#e4e3e2' } : null}
            />
            {'Envió físico por correo (Válido solo para Argentina)'}
          </label>
        </div>
        {deliveryTypeId === 1 && <PhysicalShipping index={index} />}
      </section>
      <section className='virtual'>
        <div className='destination_virtual'>
          <label
            className='checkbox'
            style={!userAviable.login ? { color: '#e4e3e2' } : null}
          >
            <input
              className='checkbox_input'
              type='checkbox'
              checked={deliveryTypeId === 2}
              onChange={(ev) => {
                const isChecked = ev.target.checked
                handleToggleCheckboxes(isChecked ? 2 : null)
              }}
              disabled={!userAviable.login}
              style={!userAviable.login ? { borderColor: '#e4e3e2' } : null}
            />
            Dreamon Virtual
          </label>
        </div>
        {deliveryTypeId === 2 && (
          <VirtualShipping index={index} userData={userAviable?.info} />
        )}
      </section>
      <section className='sucursal'>
        <div className='destination_sucursal'>
          <label
            className='checkbox'
            style={!userAviable.login ? { color: '#e4e3e2' } : null}
          >
            <input
              className='checkbox_input'
              type='checkbox'
              checked={deliveryTypeId === 3}
              onChange={(ev) => {
                const isChecked = ev.target.checked
                handleToggleCheckboxes(isChecked ? 3 : null)

                if (isChecked) {
                  // execute function that executes a function from the child component
                  handleClickOnChildComponent()
                }
              }}
              disabled={!userAviable.login}
              style={!userAviable.login ? { borderColor: '#e4e3e2' } : null}
            />
            Retiro en sucursal
          </label>
        </div>
        <SucursalShipping
          ref={childRef}
          index={index}
          userData={userAviable?.info}
          style={{
            display: deliveryTypeId === 3 ? 'block' : 'none',
          }}
        />
      </section>
    </main>
  )
}
