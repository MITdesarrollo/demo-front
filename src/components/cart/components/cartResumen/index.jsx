import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import './styles.scss';

export default function CartResumen({
                                        approve,
                                        setApprove,
                                        total,
                                        dataShoppingCart,
                                        handleSucess,
                                    }) {
    const router = useRouter();

    const handleApproveChange = () => {
        const newApproveState = !approve;
        setApprove(newApproveState);
    };

    return (
        <main className='cart_resumen'>
            <h1 className='resumen_title'>Resumen del pedido</h1>
            <section className='info01'>
                <div className='info01_title'>
                    {dataShoppingCart?.packages?.map((item, index) => (
                        <p className='resumen_infoTitle' key={index}>
                            {item.name}
                        </p>
                    ))}
                </div>
                <p className='resumen_subTotal' style={{ fontWeight: '500' }}>
                    {total}
                </p>
            </section>
            <div
                className='cart_resumen_border'
                style={{ width: '100%', margin: '0' }}
            ></div>
            <section className='info02'>
                <p className='resumen_send'>Gastos envío</p>
                <p className='resumen_sendValue' style={{ fontWeight: '500' }}>
                    Gratis
                </p>
            </section>
            <section className='info03'>
                <div className='cart_resumen_border' />
                <div className='info03_credit'>
                    <p className='resumen_creditUser' style={{ width: '50%' }}>
                        Crédito Dreamon
                    </p>
                    <p className='resumen_creditUserValue' style={{ width: '50%' }}>
                        $ 000.00
                    </p>
                </div>
                <p className='resumen_infoImportant'>
                    *Si tenes crédito Dreamon lo podes usar para completar esta compra.
                    Ingresá el monto que desees utilizar.
                </p>
            </section>
            <section className='info04'>
                <div className='cart_resumen_border' />
                <div className='info04_total'>
                    <p className='resumen_total' style={{ width: '50%' }}>
                        Total:
                    </p>
                    <p className='resumen_totalValue' style={{ width: '50%' }}>
                        {total}
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className='checkbox' style={{ alignItems: 'flex-start' }}>
                        <input
                            className='checkbox_input'
                            type='checkbox'
                            style={{ marginTop: '3px', width: '16px' }}
                            checked={approve}
                            onChange={handleApproveChange}
                        />
                        <p className='terminosYCondiciones'>
                            Entiendo y acepto los{' '}
                            <span
                                onClick={() => window.open('/terminosycondiciones', '_blank')}
                                style={{ color: '#ecbf52', cursor: 'pointer' }}
                            >
                                Términos y condiciones
                            </span>
                        </p>
                    </label>
                </div>
            </section>
            <div>
                <button
                    disabled={!approve}
                    className='btnRadien'
                    style={
                        !approve
                            ? { background: '#e4e3e2' }
                            : null
                    }
                    onClick={handleSucess}
                >
                    Confirmá tu pedido
                </button>
            </div>
        </main>
    );
}
