import { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { useSelector } from 'react-redux';
import { formattedRange } from '@/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function SetFilter({
  data,
  onFilterChange,
  onClearFilter,
  onPriceRangeChange,
  onSearchTextChange,
  onSearchTextClear,
  maxPrice,
  minPrice,
  priceRange = [0, 100000],
}) {
  const filterSetting = useSelector((state) => state.counter.filters);
  const [range, setRange] = useState(priceRange);

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
    <main className='filterConfiguration'>
      <div
        className='filterDestination'
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearchTextChange(searchText);
            }
          }}
          type='text'
          className='inputs'
          placeholder='Buscar'
          style={{ border: '1px solid #c4c4c4' }}
        />
        {searchText && (
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              setSearchText('');
              onSearchTextClear();
            }}
            style={{
              position: 'absolute',
              right: 10,
              top: 15,
              cursor: 'pointer',
            }}
          />
        )}
      </div>
      {filterSetting.map((filter, index) => (
        <div className='filterDestination' key={filter?.id}>
          <p>{filter.name}</p>
          <div className='selectFilter'>
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
          {filter.name === 'Precios' && (
            <div className='selectFilterPrice'>
              {formattedRangeMin} - {formattedRangeMax}
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
      <div className='filterBtn'>
        <button className='btn' onClick={onClearFilter}>
          Limpiar filtros
        </button>
      </div>
    </main>
  );
}
