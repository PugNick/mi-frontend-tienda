import { useNavigate } from 'react-router-dom';

import HeaderNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';

import './TestCount.css';
import Campos from '/imagenes/capturas para crear cuenta/campos.png';

//iconos
import Exclamation from '../Iconos/exclamation';
import ExclamationCircle from '../Iconos/ExclamationCircle';


function TestCount() {

    const navigate = useNavigate();

    return (
        <div className="countCreate">
            <HeaderNav />
            <div className="testContainerWidth">
                <div className="testCountContainer">
                    <h2>Crear Cuenta de Prueba</h2>
                    <span>
                        Estimado usuario, puede crear una cuenta de prueba en Mercado Pago para realizar una compra <strong>ficticia</strong>.
                        No utilice cuentas o tarjetas reales. Este entorno es solo para pruebas.
                    </span>
                    <a href="https://www.mercadopago.com.ar/developers/" target="_blank" rel="noopener noreferrer">
                        Click aquí para ir al sitio de desarrolladores de Mercado Pago
                    </a>
                    <div className="crearCuenta">
                        <h3>Pasos para crear la cuenta de prueba</h3>
                        <ol>
                            <li>Inicie sesión en su cuenta de Mercado Pago y haga clic en <strong>"Tus integraciones"</strong></li>
                            <li>Presione <strong>"Crear aplicación"</strong></li>
                            <li>Complete el formulario de la siguiente manera:</li>
                            <div className="crearCuentaImg">
                                <img src={Campos} alt="Formulario ejemplo para crear la aplicación en Mercado Pago" />
                            </div>
                            <span className='exclamacion'> <Exclamation /> El nombre de la aplicación debe ser único.</span>
                            <li>Una vez creada, será redirigido al inicio. En el panel izquierdo haga clic en <strong>"Cuentas de Prueba"</strong>
                                <em> (si está en la versión móvil, despliegue el menú <strong>"Información General"</strong>)</em>
                            </li>
                            <li>Genere una cuenta de prueba con el monto máximo permitido.</li>
                            <li>¡Listo! Ahora podrá iniciar sesión en Mercado Pago con esa cuenta de prueba al momento de realizar un pago.</li>
                        </ol>
                        <div>
                            <div className="iconText">
                                <ExclamationCircle />
                                <h3>Importante:</h3>
                            </div>
                            <p>
                                Las cuentas y tarjetas de prueba no generan transacciones reales,
                                no reciben correos y solo funcionan en entornos de prueba como este. <br />
                                Se recomienda usar una computadora para realizar las compras de prueba.
                            </p>
                        </div>
                    </div>
                    <button
                        className="backToCheckoutBtn"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate(-1);
                        }}
                    >
                        Continuar con la compra
                    </button>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TestCount;
