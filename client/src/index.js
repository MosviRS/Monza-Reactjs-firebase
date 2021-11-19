// Dependencias de React
import React from "react";
import ReactDOM from "react-dom";
// Estilos Globales
import "./css/estilos.css";
//import Enrutador
import Enrutador from "./enrutador";
// Render Raiz
ReactDOM.render(
  <React.StrictMode>
    <Enrutador />
  </React.StrictMode>,
  document.getElementById("root")
);
