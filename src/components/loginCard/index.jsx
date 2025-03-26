import {useState} from 'react';
import {loginUser} from '@/utils/auth';
import {useDispatch, useSelector} from 'react-redux';

import './styles.scss';
import {
    setShoppingCartByUser,
    setUserEmail,
    setUserInfo,
    setUserLogin,
    shoppingCart
} from "@/redux/feature/counterSlice";
import {GetShoppingCartByDreamerGiverId, UpsertPackageShoopingCart} from "@/redux/feature/counterApi";

export default function LoginCart({setShowAction}) {
    const [showPassword, setShowPassword] = useState(false);
    const [requiredEmail, setRequiredEmail] = useState(false);
    const [requiredPass, setRequiredPass] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const dataShoppingCart = useSelector((state) => state.counter.shoppingCart);

    const handleInput = (event) => {
        const {name, value} = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            const tempCartItems = dataShoppingCart.packages ? [...dataShoppingCart.packages] : [];
            const tempCartPackages = dataShoppingCart.shoppingCartPackages ? [...dataShoppingCart.shoppingCartPackages] : [];

            const user = await loginUser(credentials, setRequiredEmail, setRequiredPass);

            if (!user) {
                console.error("Login fallido - credenciales incorrectas");
                return;
            }

            dispatch(setUserLogin(true));
            dispatch(setUserInfo(user));
            dispatch(setUserEmail(credentials.email));

            const dreamerGiverId = user?.[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ];

            const existingUserCart = await GetShoppingCartByDreamerGiverId(dreamerGiverId);

            if (existingUserCart && existingUserCart.id) {
                dispatch(setShoppingCartByUser(existingUserCart));

                if (tempCartItems.length > 0) {
                    for (let i = 0; i < tempCartItems.length; i++) {
                        const packageItem = tempCartItems[i];

                        const packageCartItem = tempCartPackages.find(
                            item => item.packageId === packageItem.id
                        );

                        const quantity = packageCartItem ? packageCartItem.quantity : 1;

                        await UpsertPackageShoopingCart(
                            existingUserCart.id,
                            packageItem.id,
                            quantity
                        );
                    }

                    const updatedCart = await GetShoppingCartByDreamerGiverId(dreamerGiverId);
                    dispatch(setShoppingCartByUser(updatedCart));
                }
            }
            else if (tempCartItems.length > 0) {
                for (let i = 0; i < tempCartItems.length; i++) {
                    const packageItem = tempCartItems[i];


                    const packageCartItem = tempCartPackages.find(
                        item => item.packageId === packageItem.id
                    );

                    const quantity = packageCartItem ? packageCartItem.quantity : 1;


                    await dispatch(
                        shoppingCart({
                            uuid: dataShoppingCart.id || undefined,
                            packageId: packageItem.id,
                            quantity: quantity,
                            isNew: i === 0 // El primer producto crea un carrito nuevo, los demás se añaden a ese
                        })
                    );
                }

                //  carrito actualizado
                const updatedCart = await GetShoppingCartByDreamerGiverId(dreamerGiverId);
                if (updatedCart && updatedCart.id) {
                    dispatch(setShoppingCartByUser(updatedCart));
                }
            }
        } catch (error) {
            console.error("Error durante el proceso de login:", error);
        }
    };

    return (
        <main className='option'>
            <div className='option_important'>
                <p className='option_important_text'>
                    Mantenemos tus datos completamente privados.
                </p>
                <p className='option_important_text'>
                    Consulte nuestros términos y condiciones para obtener más información.
                </p>
            </div>
            <input
                className='input01'
                type='email'
                required
                placeholder='Correo electrónico*'
                name='email'
                value={credentials.email}
                onChange={handleInput}
                style={{
                    borderColor: requiredEmail ? '#ed8067' : 'none',
                    borderWidth: requiredEmail ? '0.1px' : 'none',
                    borderStyle: requiredEmail ? 'solid' : 'none',
                }}
            />
            <input
                type={showPassword ? 'text' : 'password'}
                className='input02'
                required
                placeholder='Contraseña*'
                name='password'
                value={credentials.password}
                onChange={handleInput}
                style={{
                    borderColor: requiredPass ? '#ed8067' : 'none',
                    borderWidth: requiredPass ? '0.1px' : 'none',
                    borderStyle: requiredPass ? 'solid' : 'none',
                }}
            />
            <p className='option_forgetPass'>¿Olvidaste tu contraseña?</p>
            <button className='option_btnSend' onClick={handleLogin}>
                Ingresar
            </button>
            <p className='option_info'>
                ¿No estás registrado?{' '}
                <span onClick={() => setShowAction(false)}>Registrate</span>
            </p>
        </main>
    );
}
