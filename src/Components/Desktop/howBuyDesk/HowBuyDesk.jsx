import HeaderAndNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';

import Exclamation from '../Iconos/exclamation';

import './HowBuyDesk.css';

function HowBuyDesk() {
    return (
        <div>
            <HeaderAndNav />
            <div className="HowBuyWidth">
                <div className="conrtainerHowBuy">
                    <h2>¿Cómo Comprar?</h2>
                    <div className="pasos">
                        <ol>
                            <li>Elegí el producto que deseás comprar.</li>
                            <li>Seleccioná el talle, la cantidad y presioná <strong>"Agregar al Carrito"</strong>.</li>
                            <li>Podés seguir agregando productos o ir directamente al <strong>carrito</strong>.</li>
                            <li>Elegí el método de envío y presioná <strong>"Iniciar Compra"</strong>.</li>
                            <li>Completá tus datos y hacé clic en <strong>"Continuar al Pago"</strong>.</li>
                            <li>
                                Iniciá sesión en Mercado Pago o agregá una tarjeta.

                                <div>
                                    <div className="iconText">
                                        <Exclamation />
                                        <h3>Importante:</h3>
                                    </div>
                                    <span>Este paso es únicamente para validar el funcionamiento del sistema de pagos.
                                        Usá una cuenta de prueba de <strong>Mercado Pago</strong> o una <strong>tarjeta de prueba</strong>.</span>
                                </div>

                                <strong>No uses tus datos reales.</strong>
                            </li>
                            <li>Una vez realizado el pago, serás redirigido a una pantalla que te informará si fue exitoso o no.</li>
                        </ol>
                    </div>
                    <div className="compraSegura">
                        <h3>COMPRA SEGURA:</h3>
                        <ul>
                            <li>
                                Todos los pagos se procesan a través de <strong>Mercado Pago</strong>.
                                No tenemos acceso a los datos de tu tarjeta ni de tu cuenta, por lo que tu información está 100% protegida.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HowBuyDesk;
