import { Link } from 'react-router-dom';

import './Pay.css';

const PayFailure = () => {
    return (
        <div className="payStatusWidth">
            <div className="paymentStatus">
                <h2>El pago no se pudo procesar</h2>
                <p>Tu transacción fue rechazada o cancelada.</p>
                <Link to="/">Volver al inicio</Link>
                <br />
                <Link to="/cart">Intentar nuevamente</Link>
            </div>
        </div>
    );
};

export default PayFailure;
