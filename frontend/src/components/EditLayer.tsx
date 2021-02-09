import React from "react";
import { useMapEvent } from "react-leaflet";
import { gql, useMutation } from "@apollo/client";

const INSERT_POINT = gql`
  mutation InsertPoint($geojson: geography!) {
    insert_playground_points_one(object: { point_geog: $geojson }) {
      point_id
      point_geog
    }
  }
`;

const EditLayer: React.FC = () => {
  const [insertPoint] = useMutation(INSERT_POINT);
  useMapEvent("click", (event) => {
    const geojson = {
      type: "Point",
      coordinates: [event.latlng.lat, event.latlng.lng],
    };
    // FIXME: Error handling
    insertPoint({ variables: { geojson } });
  });
  return null;
};

export default EditLayer;
