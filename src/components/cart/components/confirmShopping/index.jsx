import AlsoLike from '../alsoLike'
import DreamonConfirm from '../dreamonConfirm'
import { useRouter } from 'next/navigation'

import './styles.scss'

export default function ConfirmShopping({ data }) {
  const router = useRouter()
  const alsoLikePackageId = data?.dreamOns?.[0]?.packageId

  return (
    <main className='confirmShopping'>
      <section className='confirmShopping_section'>
        <div className='confirmShopping_subTitle'>
          <p>Nos estaremos contactando contigo a la brevedad</p>
        </div>
        {data?.dreamOns?.map((item, index) => (
          <DreamonConfirm data={item} index={index} key={index} />
        ))}
      </section>
      <h3 className='confirmShopping_userPanel' style={{ fontWeight: 500 }}>
        Podés ver detalles de tus regalos en tu{' '}
        <span
          style={{ color: '#ed8067', cursor: 'pointer' }}
          onClick={() => router.push('/account')}
        >
          panel de usuario.
        </span>
      </h3>
      <section className='confirmShopping_alsoLike'>
        {alsoLikePackageId && <AlsoLike packageId={alsoLikePackageId} />}
      </section>
    </main>
  )
}
