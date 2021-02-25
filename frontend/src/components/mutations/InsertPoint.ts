import graphql from "babel-plugin-relay/macro"; // https://create-react-app.dev/docs/adding-relay/
import { commitMutation, Environment } from "react-relay";
import { GeoJson } from "../../types";

const mutation = graphql`
  mutation InsertPointMutation($geojson: geography!) {
    insert_playground_points_one(object: { point_geog: $geojson }) {
      point_id
      point_geog
    }
  }
`;

export function insertPoint(environment: Environment, geojson: GeoJson) {
  const variables = {
    geojson,
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      // noop
    },
    onError: (err) => console.error(`Error inserting point: ${err}`),
  });
}
