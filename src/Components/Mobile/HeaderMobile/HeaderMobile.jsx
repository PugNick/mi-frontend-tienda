import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

import Vestire from '/imagenes/logos/LogosVestire/logotipo Vestire png.png';

import SearchBar from '../../Desktop/SearchBar/SearchBar';
import MenuM from '../MainNavMobile/MainNavMobile';

import IconCart from '../../Desktop/Iconos/Cart';

import './HeaderMobile.css';

function HeaderMobile() {


    const { cart } = useCart();

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <div className="relativeContainer">
            <div className="HeaderButton">
                <div className="headerWidthM">
                    <div className="HeaderContainerMo">
                        <div className="alignCenterHeader">

                            <MenuM />

                            <Link to="/">
                                <div className="imgLogoM">
                                    <img src={Vestire} alt="" />
                                </div>
                            </Link>
                            <div className="profileCartM">

                                <div className="LinkCartM">
                                    <Link className="CartM" to="/cart">
                                        <IconCart />
                                    </Link>
                                    <div className={`amountCartM${cartCount > 0 ? " showM" : ""}`}>
                                        {cartCount > 0 && (
                                            <span className="cartBadgeM">{cartCount}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="SearchBarContainerM">
                            <SearchBar />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeaderMobile