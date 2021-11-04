/*
SlimeDev
CmpTextoArea - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ElmGrupoTextoIns,
  ElmEtiquetaGbl,
  ElmTextoAreaGbl,
} from "../Elementos/Elementos";
const CmpTextoForm = ({
  estEstado,
  estCambiarEstado,
  bolTipo,
  cadEtiqueta,
  cadPlaceholder,
  cadNombre,
}) => {
  const onChange = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });
  };
  return (
    <div>
      <ElmEtiquetaGbl htmlFor={cadNombre} valido={estEstado.valido}>
        {cadEtiqueta}
      </ElmEtiquetaGbl>
      <ElmGrupoTextoIns>
        <ElmTextoAreaGbl
          type={"text"}
          placeholder={cadPlaceholder}
          id={cadNombre}
          onChange={onChange}
        />
      </ElmGrupoTextoIns>
    </div>
  );
};
export default CmpTextoForm;
