// Dependencias de React
import React from "react";
// Dependecias de React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Paginas
import Login from "./screens/login";
import Panel from "./screens/panel";
const Rutas = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/public">
          <Panel />
        </Route>
      </Switch>
    </Router>
  );
};
export default Rutas;
