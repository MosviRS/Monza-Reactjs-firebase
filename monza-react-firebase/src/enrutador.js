// Dependencias de React
import React from "react";
// Dependecias de React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Paginas
import VstIns from "./vistas/VstIns";
import Panel from "./vistas/panel";
import VstReg from "./vistas/Vstreg";
import VstNt from "./vistas/VstNt";
import VstPdts from "./vistas/VstPdts";
import VstAbns from "./vistas/VstAbns";
import VstEtgs from "./vistas/VstEtgs";
import VstPvds from "./vistas/VstPvds";
import VstBit from "./vistas/VstBit";

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
        <Route path="/1">
          <VstReg />
        </Route>
        <Route path="/2">
          <VstNt />
        </Route>
        <Route path="/3">
          <VstPdts />
        </Route>
        <Route path="/4">
          <VstAbns />
        </Route>
        <Route path="/5">
          <VstEtgs />
        </Route>
        <Route path="/6">
          <VstPvds />
        </Route>
        <Route path="/7">
          <VstBit />
        </Route>
      </Switch>
    </Router>
  );
};
export default Rutas;
