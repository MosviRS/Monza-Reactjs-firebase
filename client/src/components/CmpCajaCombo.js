/*
SlimeDev
CmpCajaCombo - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  ElmSeleccionGbl,
  ElmGrupoTextoIns,
  ElmIconoComboCaja,
  ElmEtiquetaGbl,
} from "../Elementos/Elementos";
const CompSeleccion = ({
  arrLista,
  cadEtiqueta,
  cadNombre,
  estEstado,
  estCambiarEstado,
  tipodatos,
}) => {
  // console.log(estado);
  const onChange = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });
  };
  const reder1 = (value) => {
    return (
      <option key={value.id} value={value.nombre}>
        {value.nombre}
      </option>
    );
  };
  const reder2 = (value) => {
    return (
      <option key={value.id} value={value.nombre_producto}>
        {value.nombre_producto}
      </option>
    );
  };

  const funcionRender = (value) => {
    const selectReder = {
      1: reder1(value),
      2: reder2(value),
    };
    return selectReder[tipodatos];
  };
  console.log(arrLista);
  return (
    <div>
      <ElmEtiquetaGbl htmlFor={cadNombre}>{cadEtiqueta}</ElmEtiquetaGbl>
      <ElmGrupoTextoIns>
        <ElmSeleccionGbl name={cadNombre} onChange={onChange}>
          {arrLista.map((value) => {
            funcionRender(value);
          })}
        </ElmSeleccionGbl>
        <ElmIconoComboCaja icon={faChevronDown} />
      </ElmGrupoTextoIns>
    </div>
  );
};

export default CompSeleccion;
