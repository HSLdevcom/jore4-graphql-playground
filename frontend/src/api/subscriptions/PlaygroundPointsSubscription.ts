import graphql from "babel-plugin-relay/macro"; // https://create-react-app.dev/docs/adding-relay/
import { useMemo, useState } from "react";
import { useSubscription } from "react-relay";
import { PlaygroundPointsSubscriptionResponse } from "./__generated__/PlaygroundPointsSubscription.graphql";

const subscription = graphql`
  subscription PlaygroundPointsSubscription {
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

const variables = {};

export const usePlaygroundPointsSubscription = () => {
  // FIXME: avoid any type
  const [data, setData] = useState<any>([]);
  const config = useMemo(
    () => ({
      variables,
      subscription,
      onNext: (data: unknown) => {
        // FIXME: how to avoid type casting?
        const playground_points = (data as PlaygroundPointsSubscriptionResponse).playground_points_connection.edges.map(
          (item) => item.node
        );
        setData(playground_points);
      },
    }),
    [setData]
  );
  useSubscription(config);
  return data;
};
