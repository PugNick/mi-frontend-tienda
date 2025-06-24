import HeaderAndNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';


//iconos
import Phone from '../Iconos/Phone';
import Correo from '../Iconos/Correo';
import Location from '../Iconos/Location';
import Instagram from '../Iconos/Instagram';
import Facebook from '../Iconos/Facebook';

import './ContactDesk.css';
import '../Iconos/Iconos.css';

function ContactDesk() {
    return (
        <div>
            <HeaderAndNav />
            <div className="containerContactWidth">
                <div className="containerContactH2">
                    <h2>Contactanos</h2>
                    <div className="containerContact">
                        <div className="dataCompany">
                            <div className="dataContact">
                                <div className="iconsContainer">
                                    <Phone />
                                    <span>
                                        +54 3884049460
                                    </span>
                                </div>
                                <div className="iconsContainer">
                                    <Correo />
                                    <span>
                                        pablovjujuy@gmail.com
                                    </span>
                                </div>
                                <div className="iconsContainer">
                                    <Location />
                                    <span>
                                        Desconocida
                                    </span>
                                </div>
                            </div>
                            <div className="redes">
                                <div className="iconsContainer">
                                    <a href='#'>
                                        <Instagram />
                                    </a>
                                    <span>Seguinos en Instagram</span>
                                </div>
                                <div className="iconsContainer">
                                    <a href="#">
                                        <Facebook />
                                    </a>
                                    <span>Seguinos en Facebook</span>
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <form>
                                <div className="name">
                                    <div className="label">
                                        <label htmlFor="name">Nombre</label>
                                    </div>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div className="email">
                                    <div className="label">
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="phone">
                                    <div className="label">
                                        <label htmlFor="phone">Teléfono</label>
                                    </div>
                                    <input type="tel" id="phone" name="phone" required />
                                </div>
                                <div className="message">
                                    <div className="label">
                                        <label htmlFor="message">Mensaje</label>
                                    </div>
                                    <textarea id="message" name="message" rows="4" required></textarea>
                                </div>
                                <div className="send">
                                    <button type="submit">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactDesk