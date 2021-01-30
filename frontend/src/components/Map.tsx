import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
    </MapContainer>
  );
};

export default Map;
