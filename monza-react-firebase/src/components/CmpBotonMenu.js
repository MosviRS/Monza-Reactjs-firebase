/*
SlimeDev
CmpBotonMenu - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  faStickyNote,
  faUsers,
  faIndustry,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

import {
  ElmGrupoTextoIns,
  ElmBotonMenu,
  ElmIconoBotonMenu,
} from "../Elementos/Elementos";
const SeleccionIcono = {
  1: faStickyNote,
  2: faProductHunt,
  3: faUsers,
  4: faIndustry,
  5: faCashRegister,
};
const CmpBotonMenu = ({ cadicono, cadTipo, cadTexto }) => {
  return (
    <ElmGrupoTextoIns>
      <ElmIconoBotonMenu icon={SeleccionIcono[cadicono]} />
      <ElmBotonMenu tipo={cadTipo}>{cadTexto}</ElmBotonMenu>
    </ElmGrupoTextoIns>
  );
};
export default CmpBotonMenu;
