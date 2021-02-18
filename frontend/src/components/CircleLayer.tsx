import { gql, useMutation, useSubscription } from "@apollo/client";
import React from "react";
import { DraggableMarker } from "./DraggableMarker";

const SUBSCRIBE_ALL_POINTS = gql`
  subscription SubscribeAllPoints {
    playground_points {
      point_geog
      point_id
    }
  }
`;

// FIXME: cache has to be updated after point is deleted? (now we get warning on console)
const DELETE_POINT = gql`
  mutation DeletePoint($point_id: uuid!) {
    delete_playground_points_by_pk(point_id: $point_id) {
      point_id
    }
  }
`;

const UPDATE_POINT = gql`
  mutation UpdatePoint($point_id: uuid!, $geojson: geography!) {
    update_playground_points_by_pk(
      pk_columns: { point_id: $point_id }
      _set: { point_geog: $geojson }
    ) {
      point_id
      point_geog
    }
  }
`;

const CircleLayer: React.FC = () => {
  // FIXME: Subscribe only to the intersection of viewport and points
  //const map = useMap();
  //console.log("map bounds:", map.getBounds());

  const { loading, error, data } = useSubscription(SUBSCRIBE_ALL_POINTS);
  const [updatePoint] = useMutation(UPDATE_POINT);
  const [deletePoint] = useMutation(DELETE_POINT);
  const updatePointById = (point_id: string, geojson: any) => {
    updatePoint({ variables: { point_id, geojson } });
  };
  const deletePointById = (point_id: string) => {
    deletePoint({ variables: { point_id } });
  };

  // FIXME: add spinner?
  if (loading) return null;
  // FIXME: show in footer?
  if (error) return null;

  // FIXME: remove any type
  return data.playground_points.map(
    ({ point_id, point_geog: { coordinates } }: any) => (
      <DraggableMarker
        key={point_id}
        position={coordinates}
        onUpdate={(geojson) => updatePointById(point_id, geojson)}
        onDelete={() => deletePointById(point_id)}
      />
    )
  );
};

export default CircleLayer;
