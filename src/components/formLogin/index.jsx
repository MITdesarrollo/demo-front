import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from '@/utils/auth';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import './styles.scss';
import {
    setShoppingCartByUser,
    setUserEmail,
    setUserInfo,
    setUserLogin,
    shoppingCart
} from "@/redux/feature/counterSlice";

import {GetShoppingCartByDreamerGiverId, UpsertPackageShoopingCart} from "@/redux/feature/counterApi";

export default function LoginUser({
                                      setState,
                                      handleSucess,
                                      dispatch,
                                      credentials,
                                      handleInput,
                                      setForgetPass,
                                  }) {
    const logoDreamon = process.env.apiLogoMedium;

    const [showPassword, setShowPassword] = useState(false);
    const [requiredEmail, setRequiredEmail] = useState(false);
    const [requiredPass, setRequiredPass] = useState(false);
    const dataShoppingCart = useSelector((state) => state.counter.shoppingCart);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
            router.push('/');
        } catch (error) {
            console.error("Error durante el proceso de login:", error);
        }
    };

    return (
        <main className='registerUserLogin'>
            {window.innerWidth > 768 ? (
                <div className='logoDreamon'>
                    <Image
                        alt='logoDreamon'
                        src={logoDreamon}
                        width={168}
                        height={27.09}
                    />
                </div>
            ) : null}
            <h3 className='titleLogin' style={{ fontWeight: 500 }}>Iniciá sesión</h3>
            {window.innerWidth > 768 ? <div className='separator'></div> : null}
            <p className='subTitle'>
                Mantenemos tus datos completamente privados. Consulte nuestros términos
                y condiciones para obtener más información.
            </p>
            <div className='inputContainer'>
                <input
                    type='email'
                    required
                    className='inputEmail'
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
                {requiredEmail ? (
                    <div className='errorContainer'>
                        {credentials.email.length <= 0 ? (
                            <span className='error'>{'Este campo es obligatorio'}</span>
                        ) : (
                            <span className='error'>
                {'Debes introducir un email valido'}
              </span>
                        )}
                    </div>
                ) : null}
            </div>
            <div className='inputContainer'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className='inputPass'
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
                {requiredPass ? (
                    <div className='errorContainer'>
                        <span className='error'>{'Este campo es obligatorio'}</span>
                    </div>
                ) : null}
                <FontAwesomeIcon
                    className='passwordToggle'
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={togglePasswordVisibility}
                    style={{ top: requiredPass ? '27%' : '39%' }}
                />
            </div>
            {window.innerWidth > 768 ? (
                <div className='recoveryPass'>
                    <p
                        className='recovery'
                        style={{ color: '#ecbf52', cursor: 'pointer' }}
                        onClick={() => setForgetPass(true)}
                    >
                        ¿Olvidaste tu contraseña?
                    </p>
                </div>
            ) : null}
            <button
                className='btnRadien'
                style={{ marginTop: '21px', marginBottom: '13px' }}
                onClick={handleLogin}
            >
                Ingresar
            </button>
            {window.innerWidth > 768 ? null : (
                <div className='recoveryPass'>
                    <p
                        className='recovery'
                        style={{ color: '#ecbf52', cursor: 'pointer' }}
                        onClick={() => setForgetPass(true)}
                    >
                        ¿Olvidaste tu contraseña?
                    </p>
                </div>
            )}
            <p className='register'>
                ¿No estás registrado?{' '}
                <span
                    style={{ color: '#ecbf52', cursor: 'pointer' }}
                    onClick={() => setState(false)}
                >
          Registrate
        </span>
            </p>
        </main>
    );
}
