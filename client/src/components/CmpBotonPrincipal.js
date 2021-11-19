/*
SlimeDev
CmpBotonPrincipal - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones: 
-8/11/2021 Mensaje de Alertas en el botón principal
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import { ElmBotonPrincipal } from "../Elementos/Elementos";
import {
  MostrarAlerta1,
  MostrarAlerta2,
  MostrarAlerta3,
} from "./CmpAlertas";
const CmpBotonPrincipal = ({
  cadTipofuncion,
  funcion,
  cadTipo,
  cadTexto,
  cadMensaje,
}) => {
  const Alerta1 = () => {
    MostrarAlerta1("Correcto", cadMensaje, "1", funcion);
  };
  const Alerta2 = () => {
    MostrarAlerta1("Incorrecto", cadMensaje, "2", funcion);
  };
  const Alerta3 = () => {
    MostrarAlerta1("Peligro", cadMensaje, "3", funcion);
  };
  const Alerta4 = () => {
    MostrarAlerta1("Informacion", cadMensaje, "4", funcion);
  };
  const Alerta5 = () => {
    MostrarAlerta1("¿Pregunta?", cadMensaje, "5", funcion);
  };
  const Alerta6 = () => {
    MostrarAlerta2(correcto, "¿Pregunta?", cadMensaje, "5");
  };
  const Alerta7 = () => {
    MostrarAlerta2(correcto, "Peligro", cadMensaje, "3");
  };
  const Alerta8 = () => {
    MostrarAlerta3(cadMensaje, funcion);
  };

  const correcto = () => {
    MostrarAlerta3("Accion Aplicada", funcion);
    // MostrarAlerta1("Correcto", "Accion aplicada con exito", "1", funcion);
  };
  const funciones = {
    0: funcion,
    1: Alerta1,
    2: Alerta2,
    3: Alerta3,
    4: Alerta4,
    5: Alerta5,
    6: Alerta6,
    7: Alerta7,
    8: Alerta8,
  };
  return (
    <div>
      <ElmBotonPrincipal tipo={cadTipo} onClick={funciones[cadTipofuncion]}>
        {cadTexto}
      </ElmBotonPrincipal>
    </div>
  );
};
export default CmpBotonPrincipal;
