/*
SlimeDev
enrutador - Controlador
Fecha de creación: 16/10/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Uriel Garcia Martinez,
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-16/10/2021  Creacion del enrutador
-23/10/2021  Correcciones en comentarios 
Archivos relacionados: VstIns.js, Vstreg.js, VstNt.js, VstPdts.js, VstAbns.js
VstEtgs.js, VstPvds.js, VstBit.js
*/
// Dependencias de React
import React from "react";
// Dependecias de React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Paginas
import VstIns from "./vistas/VstIns";
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
