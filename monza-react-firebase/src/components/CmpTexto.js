/*
SlimeDev
CmpTexto - Componente
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
  ElmTextoIns,
  ElmMuestraIconoIns,
} from "../Elementos/Elementos";

const CmpTexto = ({
  cadTipoprincipal,
  estEstado,
  estCambiarEstado,
  bolTipo,
  cadPlaceholder,
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
        estCambiarEstado({ ...estEstado, valido: "true" });
      } else {
        estCambiarEstado({ ...estEstado, valido: "false" });
      }
    }
  };
  console.log(bolTipo);
  return (
    <div>
      <ElmGrupoTextoIns>
        <ElmTextoIns
          tipoprincipal={cadTipoprincipal}
          type={estEstadoTexto.estado ? "text" : "password"}
          placeholder={cadPlaceholder}
          id={cadNombre}
          value={estEstado.campo}
          onChange={onChange}
          onKeyUp={ValidaExpresion}
          onBlur={ValidaExpresion}
          valido={estEstado.valido}
        />
        <ElmMuestraIconoIns
          tipoprincipal={cadTipoprincipal}
          icon={estEstadoIcono.estado ? faEye : faEyeSlash}
          onClick={() => onClick(estEstadoIcono, estEstadoTexto)}
        />
      </ElmGrupoTextoIns>
    </div>
  );
};
export default CmpTexto;
