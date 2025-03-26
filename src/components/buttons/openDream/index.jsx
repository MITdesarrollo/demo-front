import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';

import './styles.scss';

export default function OpenDream({ mobile, isHeaderLight, toggleMenu, menuOpen }) {
  const pathname = usePathname();
  const pathFilter = pathname === '/dreamon';
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push('/receiver')
        if (menuOpen) {
          toggleMenu()
        }
      }}
      style={mobile ? { border: '1px solid #ed8067' } : null}
      className={
        pathFilter || isHeaderLight ? 'openDreamon_Open' : 'openDreamon_Close'
      }
    >
      <FontAwesomeIcon
        style={mobile ? { color: '#ed8067' } : null}
        icon={faGift}
        className={
          pathFilter || isHeaderLight
            ? 'openDreamonIcon_Open'
            : 'openDreamonIcon_Close'
        }
      />
      <p
        style={mobile ? { color: '#ed8067' } : null}
        className={
          pathFilter || isHeaderLight
            ? 'openDreamonText_Open'
            : 'openDreamonText_Close'
        }
      >
        Abrir tu Dreamon
      </p>
    </button>
  );
}
