import React from "react";
import { useMap, CircleMarker } from "react-leaflet";

interface CircleLayerProps {
  centerCoordinates?: string;
}

const CircleLayer: React.FC<CircleLayerProps> = (props) => {
  const map = useMap();
  console.log("map bounds:", map.getBounds());

  return <CircleMarker center={[60.2, 24.94]} radius={20} />;
};

export default CircleLayer;
