import React from "react";
import { CircleMarker } from "react-leaflet";
import { gql, useSubscription } from "@apollo/client";

const SUBSCRIBE_ALL_POINTS = gql`
  subscription SubscribeAllPoints {
    playground_points {
      point_geog
      point_id
    }
  }
`;

const CircleLayer: React.FC = () => {
  // FIXME: Subscribe only to the intersection of viewport and points
  //const map = useMap();
  //console.log("map bounds:", map.getBounds());

  const { loading, error, data } = useSubscription(SUBSCRIBE_ALL_POINTS);

  // FIXME: add spinner?
  if (loading) return null;
  // FIXME: show in footer?
  if (error) return null;

  // FIXME: remove any type
  return data.playground_points.map(
    ({ point_id, point_geog: { coordinates } }: any) => (
      <CircleMarker key={point_id} center={coordinates} radius={20} />
    )
  );
};

export default CircleLayer;
