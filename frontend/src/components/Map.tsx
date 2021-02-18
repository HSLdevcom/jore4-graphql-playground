import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CircleLayer from "./CircleLayer";
import EditLayer from "./EditLayer";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  centerCoordinates?: string;
}

const Map: React.FC<MapProps> = (props) => {
  return (
    <MapContainer
      center={[60.2, 24.94]}
      zoom={17}
      style={{ minHeight: "75vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="//www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        url="https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}{r}.png"
      />
      <CircleLayer />
      <EditLayer />
    </MapContainer>
  );
};

export default Map;
