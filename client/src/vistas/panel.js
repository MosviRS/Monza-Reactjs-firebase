import React, { useState } from "react";
import CmpTexto from "../components/CmpTexto";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTextoArea from "../components/CmpTextoArea";
import CmpCajaCombo from "../components/CmpCajaCombo";
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpRevisionCaja from "../components/CmpRevisionCaja";

const Panel = () => {
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [password3, cambiarPassword3] = useState({ campo: "", valido: null });
  const [password4, cambiarPassword4] = useState({ campo: "", valido: null });
  const [password5, cambiarPassword5] = useState({ campo: "", valido: null });
  const [password6, cambiarPassword6] = useState({ campo: "", valido: null });
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  const semana = [
    { id: "1", nombre: "Lunes" },
    { id: "2", nombre: "Martes" },
    { id: "3", nombre: "Miercoles" },
    { id: "4", nombre: "Jueves" },
    { id: "5", nombre: "Viernes" },
    { id: "6", nombre: "Sabado" },
    { id: "7", nombre: "Domingo" },
  ];

  console.log("combo ", password6);
  return (
    <main>
      <CmpTexto
        cadTipoprincipal={"1"}
        estEstado={usuario}
        estCambiarEstado={cambiarUsuario}
        bolTipo={true}
        cadPlaceholder="Usuario"
        cadNombre="usuario"
        exprExpresionR={expresiones.usuario}
      />
      <br />
      <br />
      <CmpTexto
        cadTipoprincipal={"2"}
        estEstado={password}
        estCambiarEstado={cambiarPassword}
        bolTipo={true}
        cadPlaceholder="Contraseña"
        cadNombre="Contraseña"
        exprExpresionR={expresiones.password}
      />
      <br />
      <br />

      <CmpTextoForm
        cadTipoprincipal={"2"}
        estEstado={password2}
        estCambiarEstado={cambiarPassword2}
        bolTipo={true}
        bolObligatorio={"false"}
        cadEtiqueta="Nombre:"
        cadPlaceholder="Contraseña"
        cadNombre="Contraseña"
        cadLeyenda="Nombre debe llevar solo letras"
        exprExpresionR={expresiones.password}
      />
      <CmpTextoBuscar
        estEstado={password3}
        estCambiarEstado={cambiarPassword3}
        cadPlaceholder={"Busqueda"}
        cadNombre="Busqueda"
      />
      <CmpTextoArea
        estEstado={password4}
        estCambiarEstado={cambiarPassword4}
        cadEtiqueta={"Texto Area"}
        cadPlaceholder="Entre calles 1 y 2"
        cadNombre="Referencias"
      />
      <CmpCajaCombo
        arrLista={semana}
        cadEtiqueta={"Combo Caja"}
        cadNombre={"Combocaja"}
        estEstado={password5}
        estCambiarEstado={cambiarPassword5}
      />
      <CmpBotonPrincipal cadTipofuncion={8} cadTipo="4" cadTexto="Texto" />

      <CmpBotonMenu cadicono="5" cadTipo="1" cadTexto="Texto" />
      <CmpRevisionCaja
        estEstado={password6}
        estCambiarEstado={cambiarPassword6}
      />
    </main>
  );
};
export default Panel;
