import React from "react";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Map from "./components/Map";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
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
