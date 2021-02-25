import graphql from "babel-plugin-relay/macro"; // https://create-react-app.dev/docs/adding-relay/
import { commitMutation } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { GeoJson } from "../../types";

const mutation = graphql`
  mutation UpdatePointMutation($point_id: uuid!, $geojson: geography!) {
    update_playground_points_by_pk(
      pk_columns: { point_id: $point_id }
      _set: { point_geog: $geojson }
    ) {
      point_id
      point_geog
    }
  }
`;

export function updatePoint(
  environment: IEnvironment,
  { point_id, geojson }: { point_id: string; geojson: GeoJson }
) {
  const variables = {
    point_id,
    geojson,
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      // noop
    },
    onError: (err) => console.error(`Error updating point: ${err}`),
  });
}
