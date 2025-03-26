'use client'

import ClubVip from '@/components/clubVip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'
import { GetFavoritesPackages } from '@/redux/feature/counterApi'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import FavoritePackage from '@/components/favoritePackage'
import ShareFavoritePackage from '@/components/popup/shareFavorites'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import FavoritePackageMobile from '@/components/favoritePackageMobile'

import './styles.scss'
import { useRouter } from 'next/navigation'

export default function FavoritesPackages() {
  const [listPackages, setlistPackages] = useState([])
  const [sendEmail, setSendEmail] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const favorites = async () => {
      const listFavorites = await GetFavoritesPackages()
      setlistPackages(listFavorites)
    }
    favorites()
  }, [])

  const handleSendEmail = () => {
    setSendEmail(!sendEmail)
  }

  return (
    <>
      <main className='favoritesPacakges'>
        <section className='favoritesPacakges_content'>
          {window.innerWidth <= 768 && (
            <div
              className='favoritesPacakges_continueSearch'
              onClick={() => router.push('/search')}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{
                  marginRight: '10px',
                  color: '#8E8E8E',
                  width: '6.98px',
                }}
              />
              <p>Seguí buscando tus favoritos Dreamon</p>
            </div>
          )}
          <section className='favoritesPacakges_title'>
            {window.innerWidth > 768 && (
              <div
                className='favoritesPacakges_moreFavorites'
                onClick={() => router.push('/search')}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  style={{
                    marginRight: '10px',
                    color: '#8E8E8E',
                    width: '6.98px',
                  }}
                />
                <p>Seguí buscando tus favoritos Dreamon</p>
              </div>
            )}
            <h1>Favoritos</h1>
            <div className='favoritesPacakges_share' onClick={handleSendEmail}>
              <p>Compartir lista</p>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  marginLeft: '10px',
                  cursor: 'pointer',
                  color: '#8E8E8E',
                }}
              />
            </div>
          </section>
          <div>
            {listPackages?.map((item, index) =>
              window.innerWidth > 768 ? (
                <FavoritePackage key={index} data={item} />
              ) : (
                <FavoritePackageMobile key={index} data={item} />
              )
            )}
          </div>
        </section>
      </main>
      <Modal
        open={sendEmail}
        onClose={handleSendEmail}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ShareFavoritePackage
            handleSendEmail={handleSendEmail}
            data={listPackages}
          />
        </Box>
      </Modal>
      <ClubVip />
    </>
  )
}
