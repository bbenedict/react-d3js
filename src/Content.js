import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Home";
import ScatterChart from "./ScatterChart";

export default function Content() {
  return (
    <Router>
      <div style={{display: "flex", height: "100%" }}>
        <div role="navigation" aria-label="Primary Navigation"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "13em",
            padding: ".5em",
            backgroundColor: "green"
          }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home page</Link>
          <Link to="/scatterchart" style={{ color: "white", textDecoration: "none" }}>Scatter chart</Link>
        </div>
        <div id="main" role="main" aria-label="Primary Content"
          style={{ padding: "1em" }}
        >
          <Switch>
            <Route path="/scatterchart">
              <ScatterChart />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};
