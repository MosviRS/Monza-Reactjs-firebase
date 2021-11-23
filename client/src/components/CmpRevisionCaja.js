/*
SlimeDev
CmpRevisionCaja - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-19/11/2021 - César Pedraza Hernández: Se agrega el componente para la vista vstEtgs.js
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ElmContenedorRevCaja,
  ElmEtqRevCajaGbl,
  ElmOpcion,
} from "../Elementos/Elementos";
const CmpRevisionCaja = ({ tipo, estEstado, estCambiarEstado, funcion }) => {
  const onClick = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });
  };
  const tipo1 = () => {
    return (
      <ElmContenedorRevCaja>
        <ElmEtqRevCajaGbl>Pago a:</ElmEtqRevCajaGbl>
        <div>
          <ElmOpcion>
            <input
              type="checkbox"
              value="contado"
              checked={estEstado.campo === "contado"}
              onChange={onClick}
            />
            <label>Contado</label>
          </ElmOpcion>
        </div>
        <div>
          <ElmOpcion>
            <input
              type="checkbox"
              visibility="hidden"
              value="credito"
              checked={estEstado.campo === "credito"}
              onChange={onClick}
            />
            <label>Crédito</label>
          </ElmOpcion>
        </div>
      </ElmContenedorRevCaja>
    );
  };
  const tipo2 = () => {
    return (
      <ElmContenedorRevCaja>
        <ElmEtqRevCajaGbl>Estado de la entrega:</ElmEtqRevCajaGbl>
        <div>
          <ElmOpcion>
            <input
              type="checkbox"
              value="entregado"
              checked={estEstado.campo == "entregado"}
              onChange={onClick}
            />
            <label>Entregado</label>
          </ElmOpcion>
        </div>
        <div>
          <ElmOpcion>
            <input
              type="checkbox"
              visibility="hidden"
              value="pendiente"
              checked={estEstado.campo == "pendiente"}
              onChange={onClick}
            />
            <label>Pendiente</label>
          </ElmOpcion>
        </div>
      </ElmContenedorRevCaja>
    );
  };
  const selectTipo = {
    1: tipo1(),
    2: tipo2(),
  };
  return <div>{selectTipo[tipo || "1"]}</div>;
};
export default CmpRevisionCaja;
