import graphql from "babel-plugin-relay/macro"; // https://create-react-app.dev/docs/adding-relay/
import { commitMutation } from "react-relay";
import { IEnvironment } from "relay-runtime";

const mutation = graphql`
  mutation DeletePointMutation($point_id: uuid!) {
    delete_playground_points_by_pk(point_id: $point_id) {
      point_id
    }
  }
`;

export function deletePoint(environment: IEnvironment, point_id: string) {
  const variables = {
    point_id,
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      // noop
    },
    onError: (err) => console.error(`Error deleting point: ${err}`),
  });
}
