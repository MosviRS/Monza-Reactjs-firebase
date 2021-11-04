// Dependencias de React
import React from "react";
// Dependecias de React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Paginas
import VstIns from "./screens/VstIns";
import Panel from "./screens/panel";

const Rutas = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <VstIns />
        </Route>
        <Route path="/public">
          <Panel />
        </Route>
      </Switch>
    </Router>
  );
};
export default Rutas;
