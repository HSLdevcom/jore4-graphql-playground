import graphql from "babel-plugin-relay/macro"; // https://create-react-app.dev/docs/adding-relay/
import React, { useMemo, useState } from "react";
import { useRelayEnvironment, useSubscription } from "react-relay";
import { GeoJson } from "../types";
import { DraggableMarker } from "./DraggableMarker";
import { deletePoint } from "./mutations/DeletePoint";
import { updatePoint } from "./mutations/UpdatePoint";

const SUBSCRIBE_ALL_POINTS = graphql`
  subscription CircleLayerAllPointsSubscription {
    playground_points_connection(first: 20) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          point_geog
          point_id
        }
      }
    }
  }
`;

const CircleLayer: React.FC = () => {
  // FIXME: Subscribe only to the intersection of viewport and points
  //const map = useMap();
  //console.log("map bounds:", map.getBounds());
  const environment = useRelayEnvironment();
  const [points, setPoints] = useState([]);

  // FIXME: how subscriptions should work with relay..? This is kind of stupid. Should we e.g. just initialize this subscription somewhere and then query the results here?
  // FIXME: sepatate subscription from UI component
  const config = useMemo(
    () => ({
      variables: {},
      subscription: SUBSCRIBE_ALL_POINTS,
      onNext: (data: any) => {
        const playground_points = data.playground_points_connection.edges.map(
          (item: any) => item.node
        );
        setPoints(playground_points);
      },
      onCompleted: () => {
        // server closed subscription
      },
    }),
    []
  );
  useSubscription(config);

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
