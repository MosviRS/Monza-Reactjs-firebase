/*
SlimeDev
CmpTextoBuscar - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  ElmGrupoTextoIns,
  ElmTextoBusquedaGbl,
  ElmIconoBusquedaGbl,
} from "../Elementos/Elementos";
const CmpTextoBuscar = ({
  estEstado,
  estCambiarEstado,
  cadPlaceholder,
  cadNombre,
  filtro,
}) => {
  const onChange = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });
  };
  // console.log(estEstado);
  return (
    <ElmGrupoTextoIns>
      <ElmIconoBusquedaGbl icon={faSearch} />
      <ElmTextoBusquedaGbl
        type={"text"}
        placeholder={cadPlaceholder}
        id={cadNombre}
        value={estEstado.campo}
        onChange={onChange}
        onKeyUp={filtro}
      />
    </ElmGrupoTextoIns>
  );
};
export default CmpTextoBuscar;
