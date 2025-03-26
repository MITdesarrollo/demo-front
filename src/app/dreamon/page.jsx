'use client'

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import AddCart from '@/components/addCart'
import MoreExperience from '@/components/moreExperience'
import PopUpCart from '@/components/popupCart'
import ReactMarkdown from 'react-markdown'
import ClubVip from '@/components/clubVip'
import AlsoLike from '@/components/cart/components/alsoLike'
import MoreImagePackages from '@/components/popup/moreImages'
import {
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { GetPackage } from '@/redux/feature/counterApi'

import { CircularProgress } from '@mui/material'
import './styless.scss'
import { useRouter } from 'next/navigation'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function DreamonSelect({ data }) {
  const MapWithNoSSR = dynamic(() => import('@/components/dreamonMap/map'), {
    ssr: false,
  })

  const router = useRouter()

  const [packageInfo, setDataPackage] = useState(null)

  const [viewInfo, setViewInfo] = useState(false)
  const [viewLoc, setViewLoc] = useState(false)
  const [showPopupCart, setShowPopupCart] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [viewMore, setViewMore] = useState(false)

  const api = process.env.apiImages


  function processDescription(inputString) {
    return inputString.replace(/\n$/, '')
  }

  const togglePopup = () => {
    setShowPopupCart(!showPopupCart)
  }

  useEffect(() => {
    function fetchData() {
      GetPackage(data.id).then((res) => {
        setDataPackage(res)
      })
    }
    fetchData()
  }, [])

  return (
    <main className='dreamonSelect'>
      {showPopupCart && (
        <div className='popup_background'>
          <PopUpCart close={togglePopup} data={data} quantity={quantity} />
        </div>
      )}
      <section className='dreamonContent'>
        <div
          className='infoLeft'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
            margin: '16px 0',
          }}
          onClick={() => router.push('/search')}
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ width: '5px' }} />
          <p
            className='userAviable_back'
            style={{
              color: '#262633',
              fontFamily: 'Poppins !important',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            Seguí buscando el regalo ideal
          </p>
        </div>
        {
          window.innerWidth > 768 && (
            <div className='imgCollection'>
              <Image
                src={data.image}
                className='imgCollection01'
                alt='img collection dream 01'
                width={531.03}
                height={393.55}
                layout='fixed'
              />
              <div className='imgSection02'>
                {data.images.slice(0, 4).map((item, index) => (
                  <Image
                    className={`imgCollection0${index + 2}`}
                    alt={`img collection dream 01-${index + 1}`}
                    width={264.38}
                    height={188.84}
                    key={index}
                    src={item.imageURL}
                    layout='fixed'
                  />
                ))}
                <button
                  className='imgSection02_moreImages'
                  onClick={() => setViewMore(true)}
                >
                  <p>Ver fotos</p>
                </button>
              </div>
            </div>
          )
        }
        {window.innerWidth <= 768 && (
          <Splide aria-label='My Favorite Images'>
            {data.images.map((img, index) => (
              <SplideSlide key={index}>
                <img src={img.imageURL} className='moreImages_img' />
              </SplideSlide>
            ))}
          </Splide>
        )}
        <section className='dreamonInfo'>
          <div className='Description'>
            <h1 className='descTitle'>{data.name}</h1>
            <div className='descLocation'>
              <FontAwesomeIcon
                style={{
                  color: '#ed8067',
                  width: '17.87px',
                  height: '22.09px',
                }}
                icon={faLocationDot}
              />
              <h3 className='descLocation_ubication'>{data.locationName}</h3>
            </div>
            <h3 className='descHighL'>Highlights</h3>
            <div className='descHisgLInfo'>
              <div className='markdown'>
                <ReactMarkdown escape={false}>
                  {processDescription(data.description)}
                </ReactMarkdown>
              </div>
            </div>
            <div className='important'>
              <div className='importantInfo'>
                <div className='importantInfo_left'>
                  <Image
                    src={`${api}/[giver]_importantInformation.svg`}
                    alt='importanInformation'
                    width={20.06}
                    height={20.06}
                  />
                  <p>Información importante</p>
                </div>
                <FontAwesomeIcon
                  icon={!viewInfo ? faChevronDown : faChevronUp}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setViewInfo(!viewInfo)}
                />
              </div>
              {viewInfo ? (
                <div className='markdown'>
                  <ReactMarkdown escape={false}>
                    {processDescription(data.information)}
                  </ReactMarkdown>
                </div>
              ) : null}
            </div>
            <div className='location'>
              <div className='importantInfo'>
                <div className='importantInfo_left'>
                  <Image
                    src={`${api}/[giver]_location.svg`}
                    alt='importanInformation'
                    width={20.06}
                    height={20.06}
                  />
                  <p>Ubicación</p>
                </div>
                <FontAwesomeIcon
                  icon={!viewLoc ? faChevronDown : faChevronUp}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setViewLoc(!viewLoc)}
                />
              </div>
              {viewLoc ? (
                <div>
                  <h3
                    style={{
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      marginBottom: '25.96px',
                    }}
                  >
                    {data.locationName}
                  </h3>
                  <div style={{ width: 'auto', height: '291.45px' }}>
                    <MapWithNoSSR
                      center={[data?.latitude, data?.longitude]}
                      markers={[{ cord: [data?.latitude, data?.longitude] }]}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className='contentCard'>
            <div className='addCart'>
              {packageInfo && (
                <AddCart
                  data={packageInfo}
                  show={togglePopup}
                  packageId={data?.id}
                  setQuantity={setQuantity}
                />
              )}
              {!packageInfo && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </div>
            <div className='moreExperience'>
              <MoreExperience />
            </div>
          </div>
        </section>
        <div className='dreamonSelect_alsoLike'>
          <AlsoLike packageId={data.id} isBigTittle={true} />
        </div>
      </section>
      {viewMore && <MoreImagePackages setViewMore={setViewMore} data={data} />}
      <ClubVip />
    </main>
  )
}
