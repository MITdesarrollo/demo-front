'use client'
import CartSession from "@/components/cartSession";
import PackageDescription from "@/components/packageDesc";
import {useSelector} from "react-redux";

import "./styles.scss";

export default function CartContentInfo(props) {
    const {userAviable, dataShoppingCart, approve, handleSucess, setApprove, errorMessage} = props;

    const packageStates = useSelector(
        (state) => state.counter?.shoppingCart?.packSelect || []
    );

    // Verificar si todos los paquetes están listos
    const allPackagesReady = packageStates.length > 0 && packageStates.every(state => state === true);

    const handleApproveChange = () => {
        const newApproveState = !approve;
        setApprove(newApproveState);
    };

    return (
        <main>
            <div className="cart_content_info">
                {userAviable.login ? null : <CartSession/>}
                <div className="cart_content_info_package">
                    {dataShoppingCart.packages && dataShoppingCart.packages.map((data, index) => (
                        <PackageDescription data={data} key={index} index={index}/>
                    ))}
                </div>
                <div style={window.innerWidth <= 768 ? ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: "20px"
                }) : {marginBottom: "23px", marginLeft: "36px"}}>
                    <label
                        className="checkbox"
                    >
                        <input
                            className="checkbox_input"
                            type="checkbox"
                            checked={approve}
                            onChange={handleApproveChange}
                        />
                        <p className="terminosYCondiciones">
                            Entiendo y acepto los{" "}
                            <span
                                onClick={() => window.open("/terminosycondiciones", "_blank")}
                                style={{color: "#ecbf52", cursor: "pointer"}}
                            >
                                Términos y condiciones
                            </span>
                        </p>
                    </label>
                </div>
                <div style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%"
                }}>
                    {errorMessage && (
                        <p style={{
                            color: '#ed8067',
                            marginBottom: '15px',
                            fontWeight: '500',
                            textAlign: 'center',
                            width: window.innerWidth <= 768 ? "80%" : "100%",
                            padding: '8px',
                            backgroundColor: '#fff0f0',
                            borderRadius: '4px',
                            border: '1px solid #ffcccb',
                            animation: 'fadeIn 0.3s ease-in-out'
                        }}>
                            {errorMessage}
                        </p>
                    )}
                    <button
                        disabled={!approve}
                        className="btnRadien"
                        onClick={handleSucess}
                        style={{
                            background: !approve ? "#e4e3e2" : null,
                            width: window.innerWidth <= 768 ? "70%" : "100%",
                        }}
                    >
                        Confirmá tu pedido
                    </button>
                </div>
            </div>
        </main>
    );
}
