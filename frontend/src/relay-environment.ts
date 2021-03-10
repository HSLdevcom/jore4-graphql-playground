import {
  Environment,
  Network,
  Observable,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getWsUri } from "./config";

const subscriptionClient = new SubscriptionClient(
  `${getWsUri()}/v1beta1/relay`,
  {
    reconnect: true,
  }
);

function fetchQuery(operation: RequestParameters, variables: Variables) {
  return fetch("/v1beta1/relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

const subscribe = (request: RequestParameters, variables: Variables) => {
  const subscribeObservable = subscriptionClient.request({
    // any-casting because relay's typings are off? this is defined as in their docs in https://relay.dev/docs/en/subscriptions
    query: request.text as any,
    operationName: request.name,
    variables,
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  // @ts-expect-error relay's typings are off? this is defined as in their docs in https://relay.dev/docs/en/subscriptions
  return Observable.from(subscribeObservable);
};

const environment = new Environment({
  // @ts-expect-error relay's typings are off? this is defined as in their docs in https://relay.dev/docs/en/subscriptions
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});

export const relayEnvironment = environment;
