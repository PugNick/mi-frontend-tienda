// Puedes poner esto en tu layout principal o en el componente que quieras
import { useState, useEffect } from "react";
import AwworUp from '../Desktop/Iconos/ArrowToUp';

import './ButtonTop.css';

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        const headerHeight = 181; // Ajusta según la altura real de tu header
        window.scrollTo({ top: -headerHeight, behavior: "smooth" });
        // Si el header es fixed y tapa contenido, puedes hacer:
        // window.scrollTo({ top: -headerHeight, behavior: "smooth" });
    };

    return visible ? (
        <button
            className="ButtonTop"
            onClick={scrollToTop}
            aria-label="Volver arriba"
        >
            <AwworUp />
        </button>
    ) : null;
}

export default ScrollToTopButton;