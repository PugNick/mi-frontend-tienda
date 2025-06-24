import { Link } from 'react-router-dom';

import './Pay.css';

const PayPending = () => {
    return (
        <div className="payStatusWidth">
            <div className="paymentStatus">
                <h2>Tu pago está en proceso</h2>
                <p>Se te notificará cuando tu pago esté completo.</p>
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    );
};

export default PayPending;
