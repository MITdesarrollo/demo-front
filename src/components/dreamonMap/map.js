import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function MyMap(props) {
  const { zoom = 13, center = [51.505, -0.09], markers } = props;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', zIndex: '1' }}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.map((element, idx) => {
        return (
          <Marker
            position={element?.cord}
            draggable={false}
            animate={false}
            key={idx}
          >
            <Popup>Test PopUP</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
