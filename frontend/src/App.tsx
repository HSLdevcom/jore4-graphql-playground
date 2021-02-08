import React from "react";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import Map from "./components/Map";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/v1/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    const isSubscription =
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription";
    return isSubscription;
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <header>
        <h1>Map example</h1>
      </header>
      <Map />
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  </ApolloProvider>
);

export default App;
