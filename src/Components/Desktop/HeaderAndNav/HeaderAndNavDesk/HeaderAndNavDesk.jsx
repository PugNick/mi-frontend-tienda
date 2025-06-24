import { useState, useEffect } from 'react';
import Header from '../../HeaderDesk/HeaderDesk';
import Menu from '../../MainNavBarDesk/MainNavBarDesk';
import './HeaderAndNavDesk.css';

function HeaderAndNavDesk() {
    const [isSticky, setIsSticky] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY && currentScrollY > 100) {
                // Scroll hacia abajo: deja de ser sticky
                setIsSticky(false);
            } else if (currentScrollY < prevScrollY) {
                // Scroll hacia arriba: vuelve a ser sticky
                setIsSticky(true);
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    return (
        <div className={isSticky ? "widthHN sticky" : "widthHN"}>
            <div className="HNContainer">
                <div className="header">
                    <Header />
                </div>
                <div className="menu">
                    <Menu />
                </div>
            </div>
        </div>
    );
}

export default HeaderAndNavDesk;