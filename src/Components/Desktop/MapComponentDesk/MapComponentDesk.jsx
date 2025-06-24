import PropTypes from "prop-types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const MapComponentDesk = ({ center, points }) => {
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                {points.map((point, index) => (
                    <Marker key={index} position={{ lat: point.lat, lng: point.lng }} title={point.name} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

MapComponentDesk.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }).isRequired,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default MapComponentDesk;