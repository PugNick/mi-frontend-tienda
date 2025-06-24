import HeaderAndNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';
import Carousel from './Carousel/Carousel';
import ProductsRandom from './ProductsRandom/ProductsRandom';
import CategoryCard from './CategoryCard/CategoryCard';
//imagenes
import Remeras from '/imagenes/Remeras/Remera Peace/remera-peace-beige-2.jpg';
import Buzos from '/imagenes/Buzos/Con capucha/Canguro Over Liso Zeus/canguro-over-liso-zeus.jpg';
import Camperas from '/imagenes/Camperas/Abrigo/Campera Abrigo Niklas/campera-abrigo-niklas-3.jpg';
import Pantalones from '/imagenes/Pantalones/Jeans/Jean Elastizado C68/JEAN-ELASTIZADO-c68-1.jpg';


import './HomePageDesk.css';

function HomePageDesk() {
    return (
        <div className='HomePageContainer'>
            <div className="allHeaderAndNavContainerHomePage">
                <HeaderAndNav />


                <div className="caruselContainerHomePage">
                    <Carousel />
                </div>
                <div className="categoriesContainerWidth">
                    <div className="tittleCateg">
                        <h2>Categorias más vendidas</h2>
                    </div>
                    <div className="categoriesContainer">
                        <CategoryCard
                            tittle="Remeras"
                            image={Remeras}
                            to="/category/Remeras"
                        />
                        <CategoryCard
                            tittle="Buzos"
                            image={Buzos}
                            to="/category/Pantalones"
                        />
                        <CategoryCard
                            tittle="Camperas"
                            image={Camperas}
                            to="/category/Camperas"
                        />
                        <CategoryCard
                            tittle="Pantalones"
                            image={Pantalones}
                            to="/category/Pantalones"
                        />
                    </div>
                </div>
                <div className="productsRandomContainer">
                    <ProductsRandom />
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default HomePageDesk