import { useRouter } from 'next/navigation'
import VideoIntroduction from '@/components/videoIntroduction'

import './styles.scss'

export default function SliceHome() {
  const api = process.env.apiImages

  const imageUrl = `${api}/[home]_slice01.png`
  const imageUrlMobile = `${api}/[home]_slice01_mobile.png`
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const bgBanner = {
    backgroundImage: `url(${isMobile ? imageUrlMobile : imageUrl})`,
  }

  const router = useRouter()
  return (
    <main className='sliceHome'>
      <section className='video-bg'>
        {window.innerWidth > 1024 && (
          <iframe
            src='https://www.youtube.com/embed/UbCxzZ_J3_w?&autoplay=1&mute=1&loop=1&playlist=UbCxzZ_J3_w&controls=0'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        )}

        {window.innerWidth <= 1024 && window.innerWidth > 768 && (
          <iframe
            src='https://www.youtube.com/embed/yHlvR2UR-Qs?si=fwySgdCuRyNb64zl&autoplay=1&mute=1&loop=1&controls=0'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerpolicy='strict-origin-when-cross-origin'
            allowfullscreen
          ></iframe>
        )}

        {window.innerWidth <= 768 && (
          <>
            <iframe
              src='https://www.youtube.com/embed/zEr8C1Uocyk?si=fwySgdCuRyNb64zl&autoplay=1&mute=1&loop=1&controls=0'
              title='YouTube video player'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowfullscreen
            ></iframe>
          </>
        )}
      </section>

      <div className='sliceInfo'>
        <div className='infoInsideSlice'>
          <h1 className='titleSlice'>Make it happen</h1>
          <p className='subTitleSlice'>El regalo perfecto lo encontrás acá</p>
          <div className='buttonSlice'>
            <button className='btnOne' onClick={() => router.push('/receiver')}>
              Recibí un Dreamon
            </button>
            <button className='btnTwo' onClick={() => router.push('/giver')}>
              Regalá un Dreamon
            </button>
          </div>
          <VideoIntroduction />
        </div>
      </div>
    </main>
  )
}
