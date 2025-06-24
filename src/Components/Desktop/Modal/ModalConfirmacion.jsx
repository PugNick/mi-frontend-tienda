import { useEffect, useState } from "react";
import "./ModalConfirmacion.css";

function ModalConfirmacion({ visible, mensaje, onConfirm, onCancel }) {
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if (visible) setHiding(false);
    }, [visible]);

    const handleClose = (callback) => {
        setHiding(true);
        setTimeout(() => {
            setHiding(false);
            callback();
        }, 300); // Debe coincidir con la duración de la animación
    };

    if (!visible && !hiding) return null;

    return (
        <div className="modalOverlay">
            <div className={`modalContent${hiding ? " hide" : ""}`}>
                <p>{mensaje}</p>
                <div className="modalButtons">
                    <button className="btnCancel" onClick={() => handleClose(onCancel)}>Cancelar</button>
                    <button className="btnConfirm" onClick={() => handleClose(onConfirm)}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacion;