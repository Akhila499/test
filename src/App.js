import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

function AddMarkerToClick() {
  const [markers, setMarkers] = useState([]);
  const [addMarker, setAddMarker] = useState([]);
  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      console.log("marker", newMarker, e);
      setMarkers([...markers, newMarker]);
    },
  });
  const addMarkerOnCLick = (e) => {
    e.PreventDefault();
    setAddMarker([...addMarker], markers);
  };
  const delMarker = (e) => {};
  const temp = markers.map((marker, index) => (
    <Marker position={marker} key={index}>
      <Popup>
        Marker is at {marker.lat};
        <button onClick={addMarkerOnCLick}>Add</button>
        <button onClick={delMarker}>Del</button>
      </Popup>
    </Marker>
  ));
  return temp;
}

function App() {
  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick />
      </MapContainer>
    </div>
  );
}

export default App;
