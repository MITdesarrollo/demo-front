import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { SetFavorityPackage } from '@/redux/feature/counterApi'

import './styless.scss'

export default function FilterCard(props) {
  const {
    img,
    nombre,
    destino,
    personas,
    Price,
    like,
    id,
    quantity,
    onUpdatePost,
  } = props

  const [likeState, setLikeState] = useState(like)

  const userInfo = useSelector((state) => state.counter?.user?.info)
  const dreamerId =
    userInfo?.[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ]

  const formattedNumber = Price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const heartIcon = likeState ? solidHeart : regularHeart
  const router = useRouter()

  const btnSelect = () => {
    router.push(`/search/${id}`)
  }

  const statusFavorite = likeState ? false : true

  const handledFavorite = async () => {
    if (!dreamerId) {
      router.push('/auth')
      return
    }
    try {
      setLikeState(statusFavorite)
      const updatedItem = await SetFavorityPackage(
        id,
        dreamerId,
        statusFavorite
      )
      onUpdatePost(updatedItem)
    } catch (error) {
      console.log('error', error)
      setLikeState(!statusFavorite)
    }
  }

  return (
    <main className='filterCard'>
      <div className='filterCard_img' onClick={btnSelect}>
        <Image
          src={img}
          alt='Card Background Image'
          width={260}
          height={161.08}
        />
      </div>
      <div className='filterCard_content'>
        <div className='content_card'>
          <h3 className='titleCard' onClick={btnSelect}>
            {nombre}
          </h3>
          <div className='filterCard_content_location'>
            <FontAwesomeIcon className='iconLocation' icon={faLocationDot} />
            <p>{destino}</p>
          </div>
          <div className='filterCard_content_capacity'>
            <Image
              src={'/[card]_filterCapacity.svg'}
              alt='capacity'
              width={15.19}
              height={7.69}
            />
            <p>Para {personas} personas</p>
          </div>
          <div className='filterCard_separated'> </div>
          <div className='filterCard_price'>
            <p>{formattedNumber}</p>
            <FontAwesomeIcon
              icon={heartIcon}
              style={{ color: '#ed8067', cursor: 'pointer' }}
              onClick={handledFavorite}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
