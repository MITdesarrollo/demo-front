import { useRouter } from 'next/navigation';
import CartHeaderItem from '../cartHeaderItem';
import { useSelector } from 'react-redux';

import './styless.scss';

export default function CartHeaderList({ cartTotal, shoppingCart, onToggle, menuOpen }) {
  const dataPackages = useSelector((state) => state.counter.shoppingCart);

  const totalPackages = dataPackages.shoppingCartPackages.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = dataPackages.shoppingCartPackages.reduce((acc, cartItem) => {
    const matchingPackage = dataPackages.packages.find(
      (packageItem) => packageItem.id === cartItem.packageId
    );

    if (matchingPackage) {
      const subtotal = matchingPackage.price * cartItem.quantity;
      return acc + subtotal;
    }

    return acc;
  }, 0);

  const router = useRouter();

  const formattedNumber = total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className='cartHeader'>
      <section className='cartHeaderList'>
        <section>
          {shoppingCart?.map((item, index) => (
            <div className='cartHeaderList_cartItems' key={index}>
              <CartHeaderItem
                cartTotal={cartTotal}
                data={item}
                dataPackages={dataPackages.shoppingCartPackages}
              />
            </div>
          ))}
          <div>
            <div className='infoCart'>
              <p>Carrito: {totalPackages} ítems</p>
              <p>Total: {formattedNumber}</p>
            </div>
            <button
              className='btnRadien'
              style={{ height: '30px' }}
              onClick={() => {
                router.push(`/cart`)
                if (menuOpen && onToggle) {
                  onToggle();
                }}
              }
            >
              Ver carrito
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}
