import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { ProfessionPil } from "../ProfessionPil";

const LocationSelector = ({ onLocationSelect }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        }
    })
    return null;
}

const getCurrentLocation = () => {
    const response = navigator.geolocation;
    if(response) {
        response.geolocation?.getCurrentPosition((position) => {
            if (position && position.coords) {
                return { lat: position.coords.latitude, lng: position.coords.longitude };
            }
            return null;
        })
    }
}

export function LeafLetMap ({ location = null, setLocation, height, techs = null }) {

    const locationParam = location || getCurrentLocation() || { lat: 18.9359, lng: -70.1627 };

    return (
        <MapContainer center={locationParam} zoom={9} scrollWheelZoom={true} className={`w-full h-100 rounded-xl shadow-lg z-10 ${height}`}>
            <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
            <LocationSelector onLocationSelect={setLocation} />
            {techs && techs.map((tech, index) => (
                <Marker key={index} position={[tech.location.lat, tech.location.lng]}>
                    <Popup>
                        <div className="flex flex-col gap-2 w-60">
                            <header className="flex items-center gap-2">
                            <h2 className="font-bold text-xl">Nombre:</h2>
                            <h3 className="text-lg">{tech.businessName}</h3>
                        </header>
                        <div className="flex gap-1 flex-wrap">
                            {tech.professions.map((profession) => (
                            <ProfessionPil key={profession.id} profession={profession.name} />
                            ))}
                            {tech.rating > 0 && <p>Rating: {tech.rating}</p>}
                        </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
            {locationParam && <Marker position={locationParam} />}
        </MapContainer>
    )
}