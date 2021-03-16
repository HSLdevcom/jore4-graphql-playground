import React from "react";
import { useRelayEnvironment } from "react-relay";
import { deletePoint } from "../api/mutations/DeletePoint";
import { updatePoint } from "../api/mutations/UpdatePoint";
import { usePlaygroundPointsSubscription } from "../api/subscriptions/PlaygroundPointsSubscription";
import { GeoJson } from "../types";
import { DraggableMarker } from "./DraggableMarker";

const CircleLayer: React.FC = () => {
  // FIXME: Subscribe only to the intersection of viewport and points
  //const map = useMap();
  //console.log("map bounds:", map.getBounds());
  const environment = useRelayEnvironment();

  const points = usePlaygroundPointsSubscription();

  const updatePointById = (point_id: string, geojson: GeoJson) => {
    updatePoint(environment, { point_id, geojson });
  };
  const deletePointById = (point_id: string) => {
    deletePoint(environment, point_id);
  };

  return (
    <>
      {points.map(({ point_id, point_geog: { coordinates } }: any) => (
        <DraggableMarker
          key={point_id}
          position={coordinates}
          onUpdate={(geojson) => updatePointById(point_id, geojson)}
          onDelete={() => deletePointById(point_id)}
        />
      ))}
    </>
  );
};

export default CircleLayer;
