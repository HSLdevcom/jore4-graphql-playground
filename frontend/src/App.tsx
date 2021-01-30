import React from "react";

import Map from "./components/Map";

const App: React.FC = () => (
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
);

export default App;
