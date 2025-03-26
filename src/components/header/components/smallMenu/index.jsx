import './styless.scss';

export default function SmallMenu({
  items = [],
  setItemsSelect,
  setItemsMenuOpen,
  menuOpen,
  onToggle
}) {
  const handleSelect = (option) => {
    if (typeof option === 'string') {
      // Ejecuta si option es de tipo string
      setItemsSelect(option);
    } else {
      // Ejecuta si option no es de tipo string:
      // en este caso es una funcion
      option();
    }
    // setItemsMenuOpen(false);
  };

  return (
    <main className='smallMenuHeader'>
      <section className='smallMenu'>
        <ul className='smallMenu_ul'>
          {items.map((item, index) => (
            <li
              className={`smallMenu_ul_li${item.select ? ' clickable' : ''}`}
              key={index}
              onClick={item.select ? () => {
                handleSelect(item.select)
                if (menuOpen && onToggle) {
                  onToggle();
                }
              } : null}
            >
              {item.list}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
