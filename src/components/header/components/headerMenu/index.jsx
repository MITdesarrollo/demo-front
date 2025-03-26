import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartHeaderList from '../cartHeaderList'
import OpenDream from '@/components/buttons/openDream'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import SmallMenu from '../smallMenu'
import CartHeader from '../cartHeader'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import './styles.scss'
import Popper from '@mui/material/Popper'

// this is the css z-index property for the header
const zIndexHeaderContainer = 10

export default function HeaderMenu(props) {
  const {
    path,
    pathFilter,
    logoDreamonBlack,
    logoDreamonWhite,
    // smallMenu,
    // setSmallMenu,
    cartTotal,
    lenguageSelect,
    setLenguageSelect,
    toggleMenu,
    shoppingCartEmpty,
    userMenu,
    lenguages,
    menuOpen,
    totalPrices,
    shoppingCart,
    userAviableMenu,
  } = props

  const [openMenuId, setOpenMenuId] = useState(null)

  const userAviable = useSelector((state) => state.counter.user)
  const router = useRouter()
  const pathname = usePathname()

  const isHeaderLight =
    (pathname !== '/' && pathname != '/nosotros') || menuOpen

  const [searchText, setSearchText] = useState('')

  const searchPopoverTrigger = useRef(null)
  const userOptionsPopoverTrigger = useRef(null)
  const shopCartPopoverTrigger = useRef(null)
  const languagePopoverTrigger = useRef(null)

  return (
    <div
      className={isHeaderLight ? 'headerHome_light' : 'headerHome'}
      style={
        isHeaderLight
          ? {
              borderBottom: menuOpen ? 'none' : '1px solid #c4c4c4',
              position: menuOpen ? 'fixed' : 'absolute',
            }
          : null
      }
    >
      {/* <MenubarDemo /> */}
      <Image
        src={isHeaderLight ? logoDreamonBlack : logoDreamonWhite}
        className='logoHeader'
        height={27}
        width={168}
        alt='DreamOn'
        onClick={() => {
          router.push('/')
          if (menuOpen) {
            toggleMenu()
          }
        }}
        style={{ cursor: 'pointer' }}
      />
      <div className='headerRight'>
        <OpenDream
          menuOpen={menuOpen}
          path={path}
          isHeaderLight={isHeaderLight}
        />

        <div
          onMouseOver={(event) => {
            if (openMenuId !== 'searchPopover') {
              setOpenMenuId('searchPopover')
            }
          }}
          onMouseLeave={(e) => setOpenMenuId(null)}
          onClick={() => {
            if (menuOpen) {
              toggleMenu()
            }
          }}
        >
          <div
            className='icons'
            style={
              isHeaderLight ? { color: '#262633', padding: 5 } : { padding: 5 }
            }
            ref={searchPopoverTrigger}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <Popper
            id={'searchPopover'}
            open={openMenuId === 'searchPopover'}
            anchorEl={searchPopoverTrigger.current}
            onClose={() => {
              setOpenMenuId(null)
              toggleMenu()
            }}
            placement='bottom'
            style={{ zIndex: zIndexHeaderContainer + 1 }}
          >
            <div style={{ padding: 10, margin: 0, backgroundColor: 'white' }}>
              <input
                type='text'
                className='inputs'
                placeholder='Buscar'
                defaultValue={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchText('')
                    setOpenMenuId(null)
                    if (menuOpen) {
                      toggleMenu()
                    }
                    router.push(`/search?textSearch=${searchText}`, {
                      scroll: false,
                    })
                  }
                }}
                style={{ margin: 0 }}
              />
            </div>
          </Popper>
        </div>

        {/* Perfil Menu */}
        <div
          onMouseEnter={(event) => {
            setOpenMenuId('perfilMenu')
          }}
          onMouseLeave={() => {
            setOpenMenuId(null)
          }}
        >
          <div
            className='icons'
            ref={userOptionsPopoverTrigger}
            style={{ padding: 5 }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={
                openMenuId !== 'perfilMenu'
                  ? isHeaderLight
                    ? { color: '#262633' }
                    : { color: '#f7f7f7' }
                  : { color: '#ecbf52' }
              }
            />
          </div>
          <Popper
            id={'perfilMenu'}
            open={openMenuId === 'perfilMenu'}
            anchorEl={userOptionsPopoverTrigger.current}
            onClose={() => setOpenMenuId(null)}
            placement='bottom'
            style={{ zIndex: zIndexHeaderContainer + 1 }}
          >
            <div>
              {userAviable && userAviable.login ? (
                <SmallMenu
                  items={userAviableMenu}
                  onToggle={toggleMenu}
                  menuOpen={menuOpen}
                />
              ) : (
                <SmallMenu
                  items={userMenu}
                  setItemsSelect={setLenguageSelect}
                  onToggle={toggleMenu}
                  menuOpen={menuOpen}
                />
              )}
            </div>
          </Popper>
        </div>

        {/* Like Menu */}
        <div
          className='icons'
          style={
            isHeaderLight ? { color: '#262633', padding: 5 } : { padding: 5 }
          }
          onClick={() => {
            router.push('/favorites')
            if (menuOpen && toggleMenu) {
              toggleMenu()
            }
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </div>

        <div
          onMouseEnter={(event) => {
            setOpenMenuId('shoppingCartList')
          }}
          onMouseLeave={() => {
            setOpenMenuId(null)
          }}
        >
          <div
            style={{
              padding: 5,
              color:
                openMenuId === 'shoppingCartList'
                  ? '#ecbf52'
                  : isHeaderLight
                  ? '#262633'
                  : '#f7f7f7',
            }}
            ref={shopCartPopoverTrigger}
          >
            <CartHeader cartTotal={cartTotal} />
          </div>
          <Popper
            id={'shoppingCartList'}
            open={openMenuId === 'shoppingCartList'}
            anchorEl={shopCartPopoverTrigger.current}
            onClose={() => setOpenMenuId(null)}
            placement='bottom'
            style={{ zIndex: zIndexHeaderContainer + 1 }}
          >
            <div>
              {cartTotal <= 0 ? (
                <SmallMenu
                  items={shoppingCartEmpty}
                  onToggle={toggleMenu}
                  menuOpen={menuOpen}
                />
              ) : (
                <CartHeaderList
                  cartTotal={cartTotal}
                  shoppingCart={shoppingCart}
                  subTotal={shoppingCart ? totalPrices : 0}
                  onToggle={toggleMenu}
                  menuOpen={menuOpen}
                />
              )}
            </div>
          </Popper>
        </div>

        <div
          onMouseEnter={(event) => {
            setOpenMenuId('languageMenuOpen')
          }}
          onMouseLeave={() => {
            setOpenMenuId(null)
          }}
        >
          <div ref={languagePopoverTrigger}>
            <div
              className={
                pathFilter || path ? 'lenguageSelect_light' : 'lenguageSelect'
              }
              style={{
                width: '14px',
                height: '19px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <p
                className='lenguageOption'
                style={
                  openMenuId !== 'languageMenuOpen'
                    ? isHeaderLight
                      ? { color: '#262633' }
                      : { color: '#f7f7f7' }
                    : { color: '#ecbf52' }
                }
              >
                {lenguageSelect}
              </p>
              <FontAwesomeIcon
                icon={
                  openMenuId !== 'languageMenuOpen' ? faAngleDown : faAngleUp
                }
                style={
                  openMenuId !== 'languageMenuOpen'
                    ? isHeaderLight
                      ? { color: '#262633' }
                      : { color: '#f7f7f7' }
                    : { color: '#ecbf52' }
                }
              />
            </div>
          </div>
          <Popper
            id={'languageMenuOpen'}
            open={openMenuId === 'languageMenuOpen'}
            anchorEl={languagePopoverTrigger.current}
            onClose={() => setOpenMenuId(null)}
            placement='bottom'
            style={{ zIndex: zIndexHeaderContainer + 1 }}
          >
            <SmallMenu
              items={lenguages}
              setItemsSelect={setLenguageSelect}
              onToggle={toggleMenu}
              menuOpen={menuOpen}
            />
          </Popper>
        </div>

        {/* burger menu */}
        <div
          style={menuOpen ? { color: '#262633' } : null}
          className={
            pathFilter || isHeaderLight ? 'menuHeader_light' : 'menuHeader'
          }
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </div>
      </div>
    </div>
  )
}
