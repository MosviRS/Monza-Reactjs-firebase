/*
SlimeDev
CmpTextoForm - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  ElmGrupoTextoIns,
  ElmMuestraIconoIns,
  ElmEtiquetaGbl,
  ElmEtiquetaObliGbl,
  ElmLeyendaGbl,
  ElmTextoGbl,
} from "../Elementos/Elementos";
const CmpTextoForm = ({
  cadTipoprincipal,
  estEstado,
  estCambiarEstado,
  bolTipo,
  cadEtiqueta,
  cadPlaceholder,
  cadLeyenda,
  bolObligatorio,
  cadNombre,
  exprExpresionR,
}) => {
  const [estEstadoIcono, estCambiarEstadoIcono] = useState({ estado: true });
  const [estEstadoTexto, estCambiarEstadoTexto] = useState({ estado: bolTipo });
  const onChange = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });
  };
  const onClick = (EstIcono, EstTexto) => {
    estCambiarEstadoIcono({ estado: !EstIcono.estado });
    estCambiarEstadoTexto({ estado: !EstTexto.estado });
  };
  const ValidaExpresion = () => {
    if (exprExpresionR) {
      if (exprExpresionR.test(estEstado.campo)) {
        console.log("true exp");
        estCambiarEstado({ ...estEstado, valido: "true" });
      } else {
        console.log("false exp");
        estCambiarEstado({ ...estEstado, valido: "false" });
      }
    }
  };
  console.log(estEstado);
  return (
    <div>
      <ElmEtiquetaGbl htmlFor={cadNombre} valido={estEstado.valido}>
        {cadEtiqueta}
        <ElmEtiquetaObliGbl obligatorio={bolObligatorio}>*</ElmEtiquetaObliGbl>
      </ElmEtiquetaGbl>
      <ElmGrupoTextoIns>
        <ElmTextoGbl
          tipoprincipal={cadTipoprincipal}
          type={estEstadoTexto.estado ? "text" : "password"}
          placeholder={cadPlaceholder}
          id={cadNombre}
          value={estEstado.campo}
          onChange={onChange}
          onKeyUp={ValidaExpresion}
          onBlur={ValidaExpresion}
          disabled={cadTipoprincipal === "3" ? true : false}
          valido={estEstado.valido}
        />
        <ElmMuestraIconoIns
          tipoprincipal={cadTipoprincipal}
          icon={estEstadoIcono.estado ? faEye : faEyeSlash}
          onClick={() => onClick(estEstadoIcono, estEstadoTexto)}
        />
      </ElmGrupoTextoIns>
      <ElmLeyendaGbl valido={estEstado.valido} tipoprincipal={cadTipoprincipal}>
        {cadLeyenda}
      </ElmLeyendaGbl>
    </div>
  );
};
export default CmpTextoForm;
