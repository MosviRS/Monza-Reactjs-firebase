/*
SlimeDev
CmpFecha - Componente
Fecha de creación: 10/11/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ElmFecha,
  ElmEtiquetaGbl,
  ElmEtiquetaObliGbl,
} from "./../Elementos/Elementos";

//Componentes para seleccionar Fecha con Hora
import "react-datepicker/dist/react-datepicker.css";
const CmpFecha = ({
  estEstado,
  estCambiarEstado,
  cadEtiqueta,
  cadNombre,
  bolObligatorio,
}) => {
  return (
    <div>
      <ElmEtiquetaGbl htmlFor={cadNombre}>
        {cadEtiqueta}
        <ElmEtiquetaObliGbl obligatorio={bolObligatorio}>*</ElmEtiquetaObliGbl>
      </ElmEtiquetaGbl>
      <ElmFecha
        name="Entrada"
        selected={estEstado}
        onChange={(date) => estCambiarEstado(date)}
        showTimeSelect
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="dd/M/yyyy h:mm aa"
      />
    </div>
  );
};
export default CmpFecha;