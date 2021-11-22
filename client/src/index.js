/*
SlimeDev
index - Vista
Fecha de creación: 10/11/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Uriel Garcia Martinez,
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-10/11/2021 Creacion del index
Archivos relacionados: enrutador.js
*/
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
