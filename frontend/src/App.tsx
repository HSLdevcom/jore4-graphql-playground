import React from "react";
import { RelayEnvironmentProvider } from "relay-hooks";
import Map from "./components/Map";
import { relayEnvironment } from "./relay-environment";

const App: React.FC = () => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
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
        <p>Click on the map to insert a new point into the database.</p>
      </footer>
    </div>
  </RelayEnvironmentProvider>
);

export default App;
