import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import OpenDream from '@/components/buttons/openDream';
import { useState } from 'react';
import { noop } from '@/utils/utils';
import {
  resetShoppingCart,
  setAplicationUserId,
  setReciverDreamon,
  setUserInfo,
  setUserEmail,
  setUserLogin,
} from '@/redux/feature/counterSlice';

import './styles.scss';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuMobile({ menuContent, toggleMenu = noop, menuOpen }) {
  const router = useRouter();
  const userAviable = useSelector((state) => state.counter.user);
  const dispatch = useDispatch();

  const [subMenuOpenStates, setSubMenuOpenStates] = useState(
    Array(menuContent.length).fill(false)
  );

  const toggleSubMenu = (index) => {
    const newSubMenuOpenStates = subMenuOpenStates.map((state, i) =>
      i === index ? !state : false
    );
    setSubMenuOpenStates(newSubMenuOpenStates);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    router.push('/');
    dispatch(setUserLogin(false));
    dispatch(setUserInfo(null));
    dispatch(setUserEmail(null));
    dispatch(setAplicationUserId(null));
    dispatch(setReciverDreamon(null));
    dispatch(resetShoppingCart());
  };

  return (
    <main className='menuMobile'>
      <section className='menuMobile_section'>
        <div className='menuMobile_map'>
          {menuContent.map((item, index) => (
            <section key={index}>
              <div
                className='menuMobile_Content'
                style={subMenuOpenStates[index] ? { height: '20pt' } : null}
              >
                <p className='menuMobile_Title' onClick={() => {
                  if (item.subMenu.length > 0) {
                    return toggleSubMenu(index);
                  }

                  router.push(item.path);
                  toggleMenu();
                }}>{item.menu}</p>
                {item.subMenu?.length > 0 && (
                  <FontAwesomeIcon
                    icon={
                      subMenuOpenStates[index] ? faChevronDown : faChevronUp
                    }
                    style={{ color: '#707070' }}
                    onClick={() => {
                      if (item.subMenu.length > 0) {
                        return toggleSubMenu(index);
                      }

                      router.push(item.path);
                      toggleMenu();
                    }}
                  />
                )}
              </div>
              {subMenuOpenStates[index] && (
                <ul className='menuMobile_UL'>
                  {item.subMenu.map((subMenu, index) => (
                    <li 
                      className='menuMobile_LI'
                      key={index}
                      onClick={() => {
                        toggleMenu();
                        router.push(subMenu?.path);
                      }}
                    >
                      {subMenu.name}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className='menuMobile_Content2'>
          {
            !userAviable.login ? (
              <>
                <p className='menuMobile_Title' onClick={() => {
                  router.push('/auth')
                  toggleMenu()
                  }}>
                  Iniciar sesión
                </p>
                <p className='menuMobile_Title' onClick={() => {
                  router.push('/auth?register=true')
                  toggleMenu()
                  }}>Crear cuenta</p>
              </>
            ) : (
              <>
                <p className='menuMobile_Title' onClick={() => {
                  router.push('/account')
                  toggleMenu()
                  }}>Mi cuenta</p>
                <p className='menuMobile_Title' onClick={() => {
                  logout()
                  toggleMenu()
                  }}>Cerrar sesión</p>
              </>
            )
          }
        </div>
        <div className='menuMobile_openDream'>
          <OpenDream isHeaderLight={true} mobile={true} toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>
        <div className='menuMobile_End'>
          <p className='menuMobile_help'>Ayuda y soporte</p>
          <div className='menuMobile_lenguage'>
            <p
              className='menuMobile_lenguage_select'
              style={{ color: '#ecbf52' }}
            >
              ES
            </p>
            <p className='menuMobile_lenguage_select'>EN</p>
            <p className='menuMobile_lenguage_select'>PT</p>
          </div>
        </div>
      </section>
    </main>
  );
}
