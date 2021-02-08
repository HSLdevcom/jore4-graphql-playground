import React from "react";
import { useMap, CircleMarker } from "react-leaflet";
import { useQuery, gql } from "@apollo/client";

interface CircleLayerProps {
  centerCoordinates?: string;
}

const ALL_POINTS = gql`
  query GetAllPoints {
    playground_points {
      point_geog
      point_id
    }
  }
`;

const CircleLayer: React.FC<CircleLayerProps> = (props) => {
  const map = useMap();
  console.log("map bounds:", map.getBounds());

  const { loading, error, data } = useQuery(ALL_POINTS);

  if (loading) return null;
  if (error) return null;

  // FIXME any
  return data.playground_points.map(
    ({ point_id, point_geog: { coordinates } }: any) => (
      <CircleMarker key={point_id} center={coordinates} radius={20} />
    )
  );
};

export default CircleLayer;
