import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import pickupStore from "../../../store/PickupStore";

import HandUp from '../Iconos/HandPointUp';

import './PickupPointDesk.css';

const loadGoogleMapsAPI = (callback) => {
    if (window.google && window.google.maps) {
        callback();
        return;
    }

    if (document.querySelector('script[id="google-maps-api"]')) return;

    const script = document.createElement("script");
    script.id = "google-maps-api";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    script.onerror = () => console.error("Error al cargar la Google Maps API.");
    document.head.appendChild(script);
};

const ShippingFormDesk = observer(() => {  // ✅ Hacemos el componente observable
    const [selectedLocation, setSelectedLocation] = useState("");
    const [pickupPoints, setPickupPoints] = useState([]);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const mapInstanceRef = useRef(null);
    const defaultLocation = { lat: -38.0397, lng: -57.5507 }; // Buenos Aires, Argentina

    useEffect(() => {
        loadGoogleMapsAPI(() => {
            if (inputRef.current && window.google && window.google.maps.places) {
                autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                    types: ["(cities)"],
                    componentRestrictions: { country: "AR" },
                });

                autocompleteRef.current.addListener("place_changed", () => {
                    const place = autocompleteRef.current.getPlace();
                    if (place && place.address_components) {
                        const localidad = place.address_components[0]?.long_name || "";
                        const provincia = place.address_components.find(comp =>
                            comp.types.includes("administrative_area_level_1")
                        )?.long_name || "";

                        if (localidad && provincia) {
                            setSelectedLocation(`${localidad}, ${provincia}`);
                            fetchPickupPoints(localidad, provincia);
                        } else {
                            console.warn("⚠️ No se pudo obtener la localidad o provincia.");
                        }
                    }
                });

                initializeMap(defaultLocation);
            }
        });
    }, []);

    const initializeMap = (location) => {
        if (!window.google || !window.google.maps) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 12,
        });

        mapInstanceRef.current = map;

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
    };

    const fetchPickupPoints = async (localidad, provincia) => {
        try {
            setError(null);
            setPickupPoints([]);
            pickupStore.setSelectedPickup(null);  // ✅ Ahora usamos MobX para resetear la selección

            console.log("📤 Enviando datos:", { localidad, provincia });

            const apiUrl =
                window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                    ? "http://localhost:5000"
                    : import.meta.env.VITE_API_MOBILE;

            const response = await fetch(`${apiUrl}/api/shipping/retailers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ localidad, provincia }),
            });

            if (!response.ok) throw new Error("No se encontraron puntos de retiro.");

            const data = await response.json();
            console.log("📌 Puntos de retiro recibidos:", data);

            setPickupPoints(data);
            updateMap(localidad, provincia, data);
        } catch (err) {
            console.error("❌ Error obteniendo puntos de retiro:", err.message);
            setError(err.message);
            setPickupPoints([]);
        }
    };

    const updateMap = (localidad, provincia, locations) => {
        if (!window.google || !window.google.maps) return;

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: `${localidad}, ${provincia}, Argentina` }, (results, status) => {
            if (status === "OK") {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: results[0].geometry.location,
                    zoom: 12,
                });

                mapInstanceRef.current = map;

                markersRef.current.forEach(marker => marker.setMap(null));
                markersRef.current = [];

                locations.forEach(point => {
                    const marker = new window.google.maps.Marker({
                        position: { lat: point.lat, lng: point.lng },
                        map,
                        title: point.name,
                    });
                    markersRef.current.push(marker);
                });
            } else {
                console.error("❌ No se pudo encontrar la ubicación:", status);
            }
        });
    };

    const handlePickupSelection = (point) => {
        pickupStore.setSelectedPickup(point);  // ✅ Guardamos la sucursal en MobX

        // Scroll al tope para mostrar el mapa
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (!mapInstanceRef.current || !window.google || !window.google.maps) return;

        const selectedMarker = markersRef.current.find(marker =>
            marker.getPosition().lat() === point.lat && marker.getPosition().lng() === point.lng
        );

        if (selectedMarker) {
            mapInstanceRef.current.setCenter(selectedMarker.getPosition());
            mapInstanceRef.current.setZoom(15);

            selectedMarker.setAnimation(window.google.maps.Animation.BOUNCE);

            setTimeout(() => {
                selectedMarker.setAnimation(null);
            }, 1500);
        }
    };

    return (
        <div className="mapContainerWidth">
            <div className="mapaContainer">
                <h2>Buscá puntos de retiro cerca tuyo</h2>

                <div className="inputMapContainer">
                    <input ref={inputRef} type="text" id="location" placeholder="Escribe tu provincia o localidad..." />
                </div>
                {selectedLocation && <p className="locationSelected">Ubicación seleccionada: {selectedLocation}</p>}

                <div ref={mapRef} className="mapa"></div>

                <h3>Elige tu Punto de Retiro.</h3>
                {error && <p className="errorPickUp">⚠️ {error}</p>}

                {pickupPoints.length > 0 ? (
                    <form className="pickup-option">
                        {pickupPoints.map((point, index) => (
                            <div key={index} className="pickup-label">
                                <input
                                    className="pickup-radio"
                                    type="radio"
                                    id={`pickup-${index}`}
                                    name="pickup"
                                    value={point.name}
                                    checked={pickupStore.selectedPickup?.name === point.name}
                                    onChange={() => handlePickupSelection(point)}
                                />
                                <label htmlFor={`pickup-${index}`}>
                                    {point.name}
                                </label>
                            </div>
                        ))}
                    </form>
                ) : (
                    <div className="up">

                        <p>Indica tu Provincia o Localidad.</p>
                        <HandUp />
                    </div>
                )}

                {pickupStore.selectedPickup &&
                    <div className="PointSelected">
                        <p>Punto seleccionado:</p>
                        <p className="PickUpName">{pickupStore.selectedPickup.name}</p>
                    </div>
                }
            </div>
        </div>
    );
});

export default ShippingFormDesk;