import React from "react";
import { useMapEvent } from "react-leaflet";
import { insertPoint } from "../api/mutations/InsertPoint";
import { relayEnvironment } from "../relay-environment";

const EditLayer: React.FC = () => {
  useMapEvent("click", (event) => {
    const geojson = {
      type: "Point",
      coordinates: [event.latlng.lat, event.latlng.lng],
    };
    insertPoint(relayEnvironment, geojson);
  });
  return null;
};

export default EditLayer;
