/*
SlimeDev
CmpRevisionCaja - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ElmContenedorRevCaja,
  ElmEtqRevCajaGbl,
  ElmOpcion,
} from "../Elementos/Elementos";
const CmpRevisionCaja = ({ estEstado, estCambiarEstado }) => {
  const onClick = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });
  };
  return (
    <ElmContenedorRevCaja>
      <ElmEtqRevCajaGbl>Método de pago:</ElmEtqRevCajaGbl>
      <div>
        <ElmOpcion>
          <input
            type="checkbox"
            value="Contado"
            checked={estEstado.campo === "Contado"}
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
            value="Crédito"
            checked={estEstado.campo === "Crédito"}
            onChange={onClick}
          />
          <label>Crédito</label>
        </ElmOpcion>
      </div>
    </ElmContenedorRevCaja>
    // <ElmContenedorRevCaja>
    //   <ElmEtqRevCajaGbl>Etiqueta</ElmEtqRevCajaGbl>
    //   <ElmGrupoTextoIns onClick={onClick}>
    //     <ElmIconoRevCaja icon={faSquare} />
    //     <ElmOpcion sel={false} value={arrLista.nombre1}>
    //       {arrLista.nombre1}
    //     </ElmOpcion>
    //   </ElmGrupoTextoIns>
    //   <ElmGrupoTextoIns onClick={onClick}>
    //     <ElmIconoRevCaja icon={faSquare} />
    //     <ElmOpcion sel={true} value={arrLista.nombre2}>
    //       {arrLista.nombre2}
    //     </ElmOpcion>
    //   </ElmGrupoTextoIns>
    // </ElmContenedorRevCaja>
  );
};
export default CmpRevisionCaja;
