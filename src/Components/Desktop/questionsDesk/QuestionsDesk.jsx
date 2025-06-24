import HeaderAndNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';


import './QuestionsDesk.css';


function QuestionsDesk() {
    return (
        <div>
            <HeaderAndNav />
            <div className="faqWidth">
                <div className="faqContainer">
                    <h2>Preguntas Frecuentes</h2>
                    <p className='firstP'>Por acá te dejamos algunas de las dudas más comunes.</p>

                    <div className="faqItem">
                        <h3>¿Hacen envíos?</h3>
                        <p>
                            Sí, realizamos envíos a todo el país. Podés elegir entre envío a domicilio o retiro en la sucursal más cercana.
                            También realizamos entregas locales a coordinar.
                        </p>
                    </div>

                    <div className="faqItem">
                        <h3>¿Puedo abonar con tarjeta?</h3>
                        <p>Claro, estos son nuestros métodos de pago disponibles:</p>
                        <ul>
                            <li>Tarjetas de crédito Visa, Mastercard y Cabal (hasta 3 cuotas sin interés).</li>
                            <li>Tarjetas de débito.</li>
                            <li>Cupones de pago en RapiPago o PagoFácil.</li>
                        </ul>
                    </div>



                    <div className="faqItem">
                        <h3>¿Cómo saber cuándo llega mi envío?</h3>
                        <p>
                            Una vez despachado, te enviamos el código de seguimiento con la fecha estimada de entrega. Recordá que los plazos no incluyen
                            fines de semana ni feriados. A los días estimados sumales entre 24 y 48 horas hábiles, que es lo que nos lleva despachar tu pedido.
                            Con ese código podrás seguir tu paquete en todo momento.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default QuestionsDesk