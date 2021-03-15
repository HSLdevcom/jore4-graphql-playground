import graphql from "babel-plugin-relay/macro"; // https://create-react-app.dev/docs/adding-relay/
import { useMemo, useState } from "react";
import { useSubscription } from "react-relay";

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
  const [data, setData] = useState([]);
  const config = useMemo(
    () => ({
      variables,
      subscription,
      onNext: (data: any) => {
        const playground_points = data.playground_points_connection.edges.map(
          (item: any) => item.node
        );
        setData(playground_points);
      },
    }),
    [setData]
  );
  useSubscription(config);
  return data;
};
