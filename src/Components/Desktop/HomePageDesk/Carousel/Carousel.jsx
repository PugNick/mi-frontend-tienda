import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import Banner from '/imagenes/Banners/BannerTiendaFrase.jpg';
import Popular from '/imagenes/Banners/BannerPopular.jpg';
import Envio from '/imagenes/Banners/paqueteRecibido.jpg';

import './Carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




const Carousel = () => {

    const settings = {
        dots: true,          // muestra los puntos de navegación
        infinite: true,      // bucle infinito
        speed: 1000,          // velocidad de transición
        slidesToShow: 1,     // cuántas slides se muestran a la vez
        slidesToScroll: 1,   // cuántas se mueven por paso
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
    };



    return (
        <div className="sliderContianerWidth">
            <div className="sliderContainer">
                <Slider {...settings}>
                    <div className='imgContainerSlider'>
                        <img src={Banner} alt="1" />
                    </div>
                    <div className='imgContainerSlider'>
                        <Link to={`/productDetail/67aa56c211043d8627a0171d`}>
                            <img src={Popular} alt="2" />
                            <div className="overlay"></div>
                        </Link>
                    </div>
                    <div className='imgContainerSlider'>
                        <img src={Envio} alt="1" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Carousel
