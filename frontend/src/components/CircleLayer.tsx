import { gql, useMutation, useSubscription } from "@apollo/client";
import React from "react";
import { CircleMarker } from "react-leaflet";

const SUBSCRIBE_ALL_POINTS = gql`
  subscription SubscribeAllPoints {
    playground_points {
      point_geog
      point_id
    }
  }
`;

const DELETE_POINT = gql`
  mutation DeletePoint($point_id: uuid!) {
    delete_playground_points_by_pk(point_id: $point_id) {
      point_id
    }
  }
`;

const CircleLayer: React.FC = () => {
  // FIXME: Subscribe only to the intersection of viewport and points
  //const map = useMap();
  //console.log("map bounds:", map.getBounds());

  const { loading, error, data } = useSubscription(SUBSCRIBE_ALL_POINTS);
  const [deletePoint] = useMutation(DELETE_POINT);

  // FIXME: add spinner?
  if (loading) return null;
  // FIXME: show in footer?
  if (error) return null;

  // FIXME: remove any type
  return data.playground_points.map(
    ({ point_id, point_geog: { coordinates } }: any) => (
      <CircleMarker
        key={point_id}
        center={coordinates}
        radius={20}
        eventHandlers={{
          click: (e) => {
            // Prevent click event from leaking into map layer
            // FIXME: is there more elegant way for doing this?
            // @ts-expect-error
            e.originalEvent.view.L.DomEvent.stopPropagation(e);
            console.log(`marked ${point_id} clicked, deleting it`, e);
            deletePoint({ variables: { point_id } });
          },
        }}
      />
    )
  );
};

export default CircleLayer;
