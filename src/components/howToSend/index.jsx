import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@mui/joy';
import Destination from '../destination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { setPackageSelect } from '@/redux/feature/counterSlice';

import './styless.scss';
import { CircularProgress } from '@mui/material';

export default function HowToSend({ ctu, index }) {
  const [initialPackSelect, setInitialPackSelect] = useState([]);
  const shoppingCartInfo = useSelector((state) => state.counter.shoppingCart);
  const dispatch = useDispatch();
  // const packSelect = useSelector((state) => state.counter?.shoppingCart?.packSelect);

  const dreamOns = shoppingCartInfo?.dreamOns;
  const dreamonId = dreamOns ? dreamOns[index]?.id : [];

  const [hasLoadedInitialPackSelect, setHasLoadedInitialPackSelect] = useState(false);

  useEffect(() => {
    if(initialPackSelect.length === 0) {
      // Inicializar packSelect con booleanos según la cantidad de elementos en dreamOns
      setInitialPackSelect(Array.isArray(dreamOns)
          ? Array(dreamOns.length).fill(false)
          : []);
      dispatch(setPackageSelect(initialPackSelect));
      setTimeout(() => setHasLoadedInitialPackSelect(true), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dreamOns]);

  const draftData = shoppingCartInfo?.draft;
  const dreamonWithId = draftData?.find((dreamon) => dreamon.id === dreamonId);

  const [method, setMethod] = useState(false);

  const newArray = Array.from({ length: ctu }, () => false);
  const [viewInfo, setViewInfo] = useState(newArray);

  const handleViewInfoClick = (index) => {
    const updatedViewInfo = [...viewInfo];
    updatedViewInfo[index] = !updatedViewInfo[index];
    setViewInfo(updatedViewInfo);
  };

  return (
    <main className='howtosend'>
      <h3 className='howtosend_title'>¿Como queres enviar tu Dreamon?</h3>
      <div className='howtosend_select'>
        <div className='howtosend_info'>
          <p className='howtosend_info_title'>Destinatario</p>
          <p className='howtosend_info_desc'>
            Esta opción te permite individualizar la entrega de tus regalos.
            Podes seleccionar un mismo destinatario o diferentes y así
            personalizar la entrega de cada Dreamon con método de envío y
            mensaje individual.
          </p>
        </div>
        <div className='howtosend_switch'>
          <p
            style={
              !method
                ? { color: '#ecbf52', marginRight: '10px' }
                : { color: '#ecbe5241', marginRight: '10px' }
            }
          >
            Mismo
          </p>
          <Switch
            color={!method ? 'warning' : 'danger'}
            variant='solid'
            onChange={() => setMethod(!method)}
            sx={{
              '--Switch-trackHeight': '10px',
              '--Switch-trackWidth': '23px',
              '--Switch-thumbSize': '10px',
            }}
          />
          <p
            style={
              method
                ? { color: '#ed8067', marginLeft: '10px' }
                : { color: '#ed806741', marginLeft: '10px' }
            }
          >
            Diferentes
          </p>
        </div>
      </div>
      {!method ? (
        <div>
          {hasLoadedInitialPackSelect && (
            <Destination
              index={index}
              dreamonWithId={dreamonWithId}
              dreamonId={dreamonId}
            />
          )}
          {!hasLoadedInitialPackSelect && (
            <CircularProgress />
          )}
        </div>
      ) : (
        <section
          className='desDiferent'
          style={
            method ? { borderTop: '2px solid rgb(196, 196, 196, 0.3)' } : null
          }
        >
          {Array.from({ length: ctu }, (v, index) => (
            <section className='desDiferent_inside' key={index}>
              <div
                className='desDiferent_title'
                style={viewInfo[index] ? { marginBottom: '20px' } : null}
              >
                <p>Destinatario {index + 1}</p>
                <div className='desDiferent_right'>
                  <p style={{ color: dreamonWithId ? '#21c14b' : '#ed8067' }}>
                    {dreamonWithId ? 'Guardado' : 'Guardar datos'}
                  </p>
                  <FontAwesomeIcon
                    icon={!viewInfo[index] ? faChevronDown : faChevronUp}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewInfoClick(index)}
                  />
                </div>
              </div>
              {viewInfo[index] && <Destination index={index} />}
            </section>
          ))}
        </section>
      )}
    </main>
  );
}
