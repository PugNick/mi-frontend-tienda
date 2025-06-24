import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Toast.css";

function Toast({ message, visible, onClose, duration = 2000, type = "success" }) {
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if (visible) {
            setHiding(false);
            const timer = setTimeout(() => setHiding(true), duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration]);

    useEffect(() => {
        if (hiding) {
            const timer = setTimeout(onClose, 300); // 300ms coincide con la animación CSS
            return () => clearTimeout(timer);
        }
    }, [hiding, onClose]);

    if (!visible && !hiding) return null;

    return (
        <div className={`toast toast-${type} ${hiding ? "toast-hide" : ""}`}>
            {message}
        </div>
    );
}

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
    type: PropTypes.oneOf(["success", "error"]),
};

export default Toast;