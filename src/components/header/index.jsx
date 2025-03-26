'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import {
  resetShoppingCart,
  setAplicationUserId,
  setReciverDreamon,
  setUserInfo,
  setUserEmail,
  setUserLogin,
} from '@/redux/feature/counterSlice';
import HeaderAuth from './components/headerAuth';
import HeaderMenu from './components/headerMenu';
import Menu from './components/menu';
import HeaderMenuMobile from './hedaerMobile';
import MenuMobile from './hedaerMobile/components/menuMobile';

import { categoryDreamon, getFilters } from '@/redux/feature/counterSlice';

import './styles.scss';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const filterSetting = useSelector((state) => state.counter.filters);

  useEffect(() => {
    dispatch(categoryDreamon());
    dispatch(getFilters());
  }, []);

  const menuContent = () => {
    const categoriesElem = filterSetting?.find(
      (item) => item?.id === 'categoryIds'
    );
    const ideasElem = filterSetting?.find((item) => item?.id === 'ideasIds');
    return [
      {
        menu: 'Regalos',
        subMenu: categoriesElem?.items?.map((item) => {
          return {
            name: item.dataName,
            path: `/search?categoryIds=${item.id}`,
          };
        }),
      },
      {
        menu: 'Ideas',
        subMenu: ideasElem?.items?.map((item) => {
          return {
            name: item.dataName,
            path: `/search?ideasIds=${item.id}`,
          };
        }),
      },
      // { menu: 'Gift Card', subMenu: [] },
      // { menu: 'Corporativo', subMenu: [] },
      { menu: 'Nosotros', path: '/nosotros', subMenu: [] },
      { menu: 'Contacto', path: '/contacto', subMenu: [] },
      { menu: 'FAQ', path: '/faq', subMenu: [] },
    ];
  };

  const mobileMenuContent = () => {
    const categoriesElem = filterSetting?.find(
      (item) => item?.id === 'categoryIds'
    );
    const ideasElem = filterSetting?.find((item) => item?.id === 'ideasIds');
    return [
      {
        menu: 'Regalos',
        subMenu: categoriesElem?.items?.map((item) => {
          return {
            name: item.dataName,
            path: `/search?categoryIds=${item.id}`,
          };
        }),
      },
      {
        menu: 'Ideas',
        subMenu: ideasElem?.items?.map((item) => {
          return {
            name: item.dataName,
            path: `/search?ideasIds=${item.id}`,
          };
        }),
      },
      { menu: 'Favoritos', path: '/favorites', subMenu: [] },
      // { menu: 'Gift Card', subMenu: [] },
      // { menu: 'Corporativo', subMenu: [] },
      { menu: 'Nosotros', path: '/nosotros', subMenu: [] },
      { menu: 'Contacto', path: '/contacto', subMenu: [] },
      { menu: 'FAQ', path: '/faq', subMenu: [] },
    ];
  };

  const [smallMenu, setSmallMenu] = useState({
    perfilMenu: false,
    languageMenuOpen: false,
    shoppingCartList: false,
  });

  const handleContainerMouseLeave = () => {
    // Restablecer todos los estados cuando el mouse sale del área del header
    setSmallMenu({
      perfilMenu: false,
      languageMenuOpen: false,
      shoppingCartList: false,
    });
  };

  const [lenguageSelect, setLenguageSelect] = useState('ES');
  const [cartTotal, setCartTotal] = useState(0); // Cart lenght
  const dispatch = useDispatch();

  const shoppingCart = useSelector(
    (state) => state.counter.shoppingCart.packages
  );

  const userData = useSelector((state) => state.counter.user.info);

  const totalPrices = shoppingCart?.reduce(
    (total, obj) => total + obj.price,
    0
  );

  useEffect(() => {
    if (shoppingCart) {
      setCartTotal(shoppingCart.length);
    } else {
      setCartTotal(0);
    }
  }, [shoppingCart]);

  const lenguages = [
    { select: 'EN', list: 'English' },
    { select: 'PR', list: 'Português' },
    { select: 'ES', list: 'Español' },
  ];

  const userMenu = [
    { select: () => router.push('/auth'), list: 'Inicía sesión' },
  ];

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

  const userAviableMenu = [
    {
      select: false,
      list: `Hola ${userData?.FirstName}`,
    },
    { select: () => router.push('/account'), list: 'Tu Cuenta DO ' },
    // { select: () => router.push('/receiver'), list: 'Canjear Gift Card ' }, // Disable
    { select: logout, list: 'Cerrar sesión ' },
  ];

  const shoppingCartEmpty = [
    {
      select: () =>
        setSmallMenu((prevFlags) => ({
          ...prevFlags,
          shoppingCartList: false,
        })),
      list: 'El carrito está vacío',
    },
  ];
  // <-

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoDreamonWhite = process.env.apiLogoMedium;
  const logoDreamonBlack = process.env.apilogoBlack;

  const resetPasswordRegex = /^\/auth\/resetPassword\/\w+\/?$/;
  const pathNameResetPass = resetPasswordRegex.test(pathname);

  const pathName = pathname === '/auth' || pathNameResetPass === true;
  const pathFilter = pathname === '/dreamon';
  const paths = pathname === '/';
  // const iconHeaderClass = isOpen ? 'iconHeader isOpen' : 'iconHeader';

  return (
    <main>
      {pathName ? (
        <HeaderAuth />
      ) : (
        <main onMouseLeave={handleContainerMouseLeave}>
          {window.innerWidth <= 768 ? (
            <HeaderMenuMobile
              logoDreamonWhite={logoDreamonWhite}
              logoDreamonBlack={logoDreamonBlack}
              cartTotal={cartTotal}
              menuOpen={isOpen}
              toggleMenu={toggleMenu}
            /> // Renderiza HeaderMenuMobile si el ancho de la pantalla es <= a 768px
          ) : (
            // Renderiza HeaderMenu para anchos de pantalla > 768px
            <HeaderMenu
              path={paths}
              pathFilter={pathFilter}
              logoDreamonWhite={logoDreamonWhite}
              logoDreamonBlack={logoDreamonBlack}
              smallMenu={smallMenu}
              setSmallMenu={setSmallMenu}
              cartTotal={cartTotal}
              lenguageSelect={lenguageSelect}
              setLenguageSelect={setLenguageSelect}
              toggleMenu={toggleMenu}
              shoppingCartEmpty={shoppingCartEmpty}
              userMenu={userMenu}
              lenguages={lenguages}
              menuOpen={isOpen}
              totalPrices={totalPrices}
              shoppingCart={shoppingCart}
              userAviableMenu={userAviableMenu}
            />
          )}
          <section
            className={!isOpen ? 'menuClose' : 'menuOpen'}
            style={
              window.innerWidth > 768
                ? { height: '100vh' }
                : { overflowY: 'auto', height: '100%' }
            }
          >
            {window.innerWidth <= 768 ? (
              <MenuMobile menuContent={mobileMenuContent()} toggleMenu={toggleMenu} menuOpen={isOpen} />
            ) : (
              <Menu menuContent={menuContent()} toggleMenu={toggleMenu} />
            )}
          </section>
        </main>
      )}
    </main>
  );
}
