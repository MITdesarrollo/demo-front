import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import './styless.scss'
import { useRouter } from 'next/navigation'

export default function CartHeader({ cartTotal, menuOpen, toggleMenu }) {
  const router = useRouter()
  return (
    <div
      className='cartIconContainer'
      onClick={() => {
        router.push('/cart')
        if (menuOpen) {
          toggleMenu()
        }
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      {cartTotal > 0 && <div className='cartItemCount'>{cartTotal}</div>}
    </div>
  )
}
