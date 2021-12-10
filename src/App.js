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
import { useState, useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

// const [addMarker, setAddMarker] = useState([]);
function AddMarkerToClick() {
  const [markers, setMarkers] = useState([]);
  const [bName, setBName] = useState("");
  let storeObj = {};
  let newMarker = {};
  const addMarkerOnCLick = (e) => {
    e.PreventDefault();
  };
  const map = useMapEvents({
    click(e) {
      newMarker = e.latlng;
      console.log("marker", newMarker["lat"], e);
      // window.localStorage.setItem("branchLoc", newMarker);
      setMarkers([...markers, newMarker]);
      storeObj[bName] = {
        branch: bName,
        lat: newMarker["lat"],
        lng: newMarker["lng"],
      };
      window.localStorage.setItem("branchDetails", JSON.stringify(storeObj));

      console.log("@@@", bName);
      JSON.parse(window.localStorage.getItem("branchDetails"));
      console.log("exp");
    },
  });
  useEffect(() => {
    console.log("marker***", markers);
  }, [storeObj]);

  const handleChange = (e) => {
    setBName(e.target.value);
  };

  const delMarker = (e) => {
    e.PreventDefault();
    // addMarker.filter(() => {});
  };
  const temp = markers.map((marker, index) => (
    <Marker position={marker} key={index}>
      <Popup>
        <form onSubmit={addMarkerOnCLick}>
          Marker is at {marker.lat};
          <input name="branchName" value={bName} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
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
