import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import CartHeader from '../components/cartHeader';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

import './styles.scss';
import { useSelector } from 'react-redux';

export default function HeaderMenuMobile(props) {
  const {
    logoDreamonWhite,
    logoDreamonBlack,
    cartTotal,
    menuOpen,
    toggleMenu,
  } = props;

  const userAviable = useSelector((state) => state.counter.user);

  const router = useRouter();

  const handleUserClick = () => {
    if (userAviable?.login) {
      router.push('/account');
      if (menuOpen) {
        toggleMenu();
      }
    } else {
      router.push('/auth');
      if (menuOpen) {
        toggleMenu();
      }
    }
  }

  return (
    <main
      className='headerMobile'
      style={
        window.innerWidth > 768 ? null : { position: 'fixed', zIndex: '999' }
      }
    >
      <section className='headerMobile_content'>
        <div className='headerMobile_content_left'>
          <div className='icons'>
            <FontAwesomeIcon
              icon={faBars}
              style={{ color: '#fff', height: '16pt' }}
              onClick={toggleMenu}
            />
          </div>
          <div className='icons'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: '#fff', width: '16.78pt' }}
              onClick={() => {
                router.push('/search')
                if (menuOpen) {
                  toggleMenu();
                }
              }}
            />
          </div>
        </div>
        <Image
          src={logoDreamonWhite}
          className='logoHeader'
          alt='logo_dreamon'
          width={153}
          height={24.67}
          onClick={() => {
            router.push('/')
            if (menuOpen) {
              toggleMenu()
            }
          }}
        />
        <div className='headerMobile_content_right'>
          <div className='icons'>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: '#fff', width: '16.78pt' }}
              onClick={handleUserClick}
            />
          </div>
          <div className='icons'>
            <CartHeader cartTotal={cartTotal} menuOpen={menuOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
      </section>
    </main>
  );
}
