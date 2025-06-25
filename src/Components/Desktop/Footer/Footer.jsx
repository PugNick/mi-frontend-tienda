import { Link } from "react-router-dom"
import './Footer.css';
import '../Iconos/Iconos.css';

import LogoMP from '/imagenes/logos/version-horizontal-large-logo-mercado-pago.jpg';
import LogoOca from '/imagenes/logos/logoOca.jpg';
import LogoAndreani from '/imagenes/logos/Logo_de_Andreani.jpg';
import LogoCorreoArg from '/imagenes/logos/logoCorreoArgentino.png';
import Phone from '../Iconos/Phone';
import Correo from '../Iconos/Correo'
import Location from '../Iconos/Location'
import LogoFacebook from '../Iconos/Facebook';
import LogoInstagram from '../Iconos/Instagram';
import Certificacion from '/imagenes/logos/QR-Afip.jpg';


function Footer() {
    return (
        <div className="widthContainerFooter">
            <div className="footerContainer">
                <div className="navigation">
                    <h4>NAVEGACIÓN</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/comoComprar">Cómo Comprar</Link></li>
                        <li><Link to="/preguntasFrecuentes">Preguntas Frecuentes</Link></li>
                    </ul>
                </div>

                <div className="pagoEnvio">
                    <div className="medioPago">
                        <h4>MEDIOS DE PAGO</h4>
                        <div className="containerLogoMp">
                            <img src={LogoMP} alt="" />
                        </div>
                    </div>
                    <div className="formasEnvio">
                        <h4>FORMAS DE ENVIO</h4>
                        <div className="containerImgs">
                            <div className="containerOca">
                                <img src={LogoOca} alt="" />
                            </div>
                            <div className="containerAndreani">
                                <img src={LogoAndreani} alt="" />
                            </div>
                            <div className="containerCorreoArg">
                                <img src={LogoCorreoArg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <h4>CONTACTANOS</h4>
                    <div className="contactGap">
                        <div className="numberContainer">
                            <div className="phoneContainerImg">
                                <Phone />
                            </div>
                            <p>
                                +54 3884049460
                            </p>
                        </div>
                        <div className="correoContainer">
                            <div className="correoContainerImg">
                                <Correo />
                            </div>
                            <p>
                                pablov@gmail.com
                            </p>
                        </div>
                        <div className="locationContainer">
                            <div className="locationContainerImg">
                                <Location />
                            </div>
                            <p>
                                Desconocida
                            </p>
                        </div>
                    </div>
                </div>
                <div className="redes">
                    <h4>REDES SOCIALES</h4>
                    <div className="containerLinks">
                        <div className="containerIg">
                            <a href="#">
                                <LogoInstagram />
                            </a>

                        </div>
                        <div className="containerFacebook">
                            <a href="#">
                                <LogoFacebook />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="certificacion">
                    <h4>CERTIFICACIÓN</h4>
                    <div className="containerCert">
                        <img src={Certificacion} alt="" />
                    </div>
                </div>
            </div>
            <div className="derechos">
                <p>© 2025 Vestire. Todos los derechos reservados.</p>
                <p>
                    Las imágenes de productos y modelos fueron obtenidas con fines ilustrativos desde <a href="https://dloindumentaria.com.ar" target="_blank" rel="noopener noreferrer">DLO indumentaria</a>.
                    Todos los derechos pertenecen a sus respectivos autores.
                </p>
            </div>
        </div>
    )
}

export default Footer
