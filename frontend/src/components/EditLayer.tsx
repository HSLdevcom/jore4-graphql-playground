import React from "react";
import { useMapEvent } from "react-leaflet";
import { relayEnvironment } from "../relay-environment";
import { insertPoint } from "./mutations/InsertPoint";

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
