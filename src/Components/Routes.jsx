import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//rutas de componentes

//principales
import Inicio from './Desktop/HomePageDesk/HomePageDesk';
import Productos from './Desktop/ProductsDesk/ProductsDesk';
import Contact from './Desktop/ContactDesk/ContactDesk';
import HowBuy from './Desktop/howBuyDesk/HowBuyDesk';
import Questions from './Desktop/questionsDesk/QuestionsDesk';

//productos
import Detail from './Desktop/ProductsDesk/ProductDetailDesk/ProductDetailDesk';
import CategoryPageDesk from './Desktop/CategoryPageDesk/CategoryPageDesk';
import SubCategoryView from './Desktop/SubCategoryDesk/SubCategoryDesk';
import ProductGhost from './Desktop/ProductsDesk/ProductGhost';
import SearchResults from './Desktop/SearchResults/SearchResults';

//usuario
import Login from './Desktop/LoginDesk/LoginDesk';
import Register from './Desktop/LoginDesk/RegisterDesk';
import Profile from './Desktop/ProfileDesk/ProfileDesk';
import Cart from './Desktop/CartDesk/CartDesk';


//envio
import PickupPoint from './Desktop/PickupPointDesk/FormPickup';
import HomeDelivery from './Desktop/HomeDeliveryDesk/HomeDeliberyDesk';
import Local from './Desktop/LocalDesk/LocalDesk';

//ordenes y compras
import HistorialCompras from './Desktop/HistorialCompras/HistorialCompras';
import CompraDetails from './Desktop/HistorialCompras/CompraDetails';
import OrderDetails from './Desktop/OrdersUser/OrderDetails';
import ListaCompras from './Desktop/ListaCompras/ListaCompras';
import OrdersList from './Desktop/OrderList/OrdersList';


//para el usuario
import CountTest from './Desktop/testCount/TestCount';

//pruebas
import Success from './PaySuccess';
import Failure from './PayFailure';
import Pending from './PayPending';


function RoutesPayment() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/productos' element={<Productos />} />
                <Route path='/contacto' element={<Contact />} />
                <Route path='/comoComprar' element={<HowBuy />} />
                <Route path='/preguntasFrecuentes' element={<Questions />} />
                <Route path='/productDetail/:id' element={<Detail />} />
                <Route path='/category/:category' element={<CategoryPageDesk />} />
                <Route path='/category/:category/subcategoria/:subcategory' element={<SubCategoryView />} />
                <Route path='/login' element={<Login />} />
                <Route path='/perfil' element={<Profile />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/register' element={<Register />} />
                <Route path='/checkout/puntoRetiro' element={<PickupPoint />} />
                <Route path='/checkout/domicilio' element={<HomeDelivery />} />
                <Route path='/checkout/local' element={<Local />} />
                <Route path='/historialCompras' element={<HistorialCompras />} />
                <Route path='/ordenes/:id' element={<OrderDetails />} />
                <Route path="/compras/:id" element={<CompraDetails />} />
                <Route path='/productGhost' element={<ProductGhost />} />
                <Route path='/search' element={<SearchResults />} />
                <Route path='/lista-compras' element={<ListaCompras />} />
                <Route path='/lista-ordenes' element={<OrdersList />} />
                <Route path='/cuentaPrueba' element={<CountTest />} />
                {// rutas de pago purebas
                }
                <Route path='/success' element={<Success />} />
                <Route path='/failure' element={<Failure />} />
                <Route path='/pending' element={<Pending />} />
            </Routes>
        </Router>
    )
}

export default RoutesPayment;