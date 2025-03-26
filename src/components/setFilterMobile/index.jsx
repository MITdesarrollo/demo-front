import { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { useSelector } from 'react-redux';
import { formattedRange } from '@/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faTimes,
  faX,
} from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function SetFilterMobile({
  data,
  onFilterChange,
  onClearFilter,
  onPriceRangeChange,
  onSearchTextChange,
  onSearchTextClear,
  maxPrice,
  minPrice,
  priceRange = [0, 100000],
  setShowFilterMobile,
}) {
  const filterSetting = useSelector((state) => state.counter.filters);
  const [range, setRange] = useState(priceRange);
  const [openSelectIndex, setOpenSelectIndex] = useState(null);

  const [formattedRangeMin, formattedRangeMax] = formattedRange(range);

  const shouldItemBeChecked2 = (filterSettingItem, filter) => {
    const optionsSelectedInRequest = data[filter.id] || -1;
    return (
      !!optionsSelectedInRequest &&
      optionsSelectedInRequest == filterSettingItem.id
    );
  };

  const [searchText, setSearchText] = useState(data?.textSearch || '');

  useEffect(() => {
    setSearchText(data?.textSearch || '');
  }, [data?.textSearch]);

  return (
    <main className='filterConfgMobile'>
      <section className='filterConfgMobile_section'>
        <div className='filterConfgMobile_section_close'>
          <FontAwesomeIcon
            icon={faX}
            style={{ width: '25px', height: '25px' }}
            onClick={() => setShowFilterMobile(false)}
          />
        </div>
        {filterSetting.map((filter, index) => (
          <div className='filterMobile_Settings' key={filter?.id}>
            <div className='mobileSettings_title'>
              <p>{filter.name}</p>
              {index !== filterSetting.length - 1 && ( // Verificar si no es el último índice
                <FontAwesomeIcon
                  icon={openSelectIndex === index ? faChevronUp : faChevronDown}
                  onClick={() =>
                    setOpenSelectIndex(openSelectIndex === index ? null : index)
                  }
                />
              )}
            </div>
            {openSelectIndex === index && (
              <div className='mobileSettings_content'>
                {filter.items.map((item, itemIndex) => (
                  <label className='labelCheck' key={item?.id}>
                    <input
                      className='inputCheck'
                      type='checkbox'
                      name={item.dataName}
                      id={item.id}
                      checked={shouldItemBeChecked2(item, filter)}
                      onChange={(event) =>
                        onFilterChange(filter?.id, item?.id, event)
                      }
                    />
                    {item.dataName}
                  </label>
                ))}
              </div>
            )}
            {filter.name === 'Precios' && (
              <div>
                <label className='optionText'>
                {formattedRangeMin} - {formattedRangeMax}
                </label>
                <Slider
                  name={filter?.name}
                  value={range}
                  onChange={(_, newRange) => setRange(newRange)}
                  onChangeCommitted={(_, newRange) =>
                    onPriceRangeChange(newRange[0], newRange[1])
                  }
                  valueLabelDisplay='auto'
                  min={minPrice}
                  max={maxPrice}
                  sx={{
                    color: '#ed8067',
                    height: 2,
                    '& .MuiSlider-thumb': {
                      height: 13,
                      width: 13,
                      boxShadow: 'none',
                    },
                    '& .MuiSlider-rail': {
                      color: '#c4c4c4',
                    },
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </section>
      <div className='confgMobile_btn'>
        <button className='btnOrange' onClick={onClearFilter}>
          Limpiar filtros
        </button>
        <button
          className='btnRadien'
          onClick={() => setShowFilterMobile(false)}
        >
          Aplicar filtros
        </button>
      </div>
    </main>
  );
}
