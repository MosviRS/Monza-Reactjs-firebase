/*
SlimeDev
CmpAlertas - Componente
Fecha de creación: 17/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Colores,
  ElmTituloAlerta,
  ElmDescripcionAlerta,
} from "./../Elementos/Elementos";

const MySwal = withReactContent(Swal);
const Tipo = {
  1: "success",
  2: "error",
  3: "warning",
  4: "info",
  5: "question",
};
const MostrarAlerta1 = (cadTexto, cadTitulo, cadTipo) => {
  MySwal.fire({
    title: <ElmTituloAlerta>{cadTitulo}</ElmTituloAlerta>,
    html: <ElmDescripcionAlerta>{cadTexto}</ElmDescripcionAlerta>,
    width: 300,
    height: 300,
    icon: Tipo[cadTipo],
    background: Colores.ColHueso,
    backdrop: `
              rgba(255,159,28,0.2)
            `,
    confirmButtonColor: Colores.ColNaranja,
    confirmButtonText: "Aceptar",
  }).then((result) => {});
};
const MostrarAlerta2 = (alerta, cadTexto, cadTitulo, cadTipo) => {
  MySwal.fire({
    title: <ElmTituloAlerta>{cadTitulo}</ElmTituloAlerta>,
    html: <ElmDescripcionAlerta>{cadTexto}</ElmDescripcionAlerta>,
    width: 300,
    height: 300,
    icon: Tipo[cadTipo],
    background: Colores.ColHueso,
    backdrop: `
              rgba(255,159,28,0.2)
            `,
    confirmButtonColor: Colores.ColVerde,
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonColor: Colores.ColRojo,
    cancelButtonText: "Rechazar",
  }).then((result) => {
    if (result.isConfirmed) {
      alerta();
    }
  });
};
const MostrarAlerta3 = (cadTitulo) => {
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    height: 20,
    width: 600,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: <ElmTituloAlerta>{cadTitulo}</ElmTituloAlerta>,
  });
};
export { MostrarAlerta1, MostrarAlerta2, MostrarAlerta3 };
