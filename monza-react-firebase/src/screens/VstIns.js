/*
SlimeDev
VstIns - Vista
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-8/11/2021 Creacion de la vista VstIns
Archivos relacionados: Elementos.js, CmpTexto.js, 
*/
import React, { useState } from "react";
import {
  Colores,
  ElmCont2VStIns,
  ElmContVStIns,
  ElmTituloVStIns,
  ELmVStIns,
} from "../Elementos/Elementos";
// Componentes
import CmpTexto from "../components/CmpTexto";
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
const VstIns = () => {
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [contrasenia, cambiarContrasenia] = useState({
    campo: "",
    valido: null,
  });
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  document.body.style = "background:" + Colores.ColHueso + ";";
  return (
    <ELmVStIns>
      <ElmContVStIns>
        <div></div>
        <ElmTituloVStIns>Inicio de Sesión</ElmTituloVStIns>

        <div className="entrada">
          <CmpTexto
            cadTipoprincipal={"1"}
            estEstado={correo}
            estCambiarEstado={cambiarCorreo}
            bolTipo={true}
            cadPlaceholder={"Correo"}
            cadNombre={"Correo"}
            exprExpresionR={expresiones.correo}
          />
        </div>
        <div className="entrada">
          <CmpTexto
            cadTipoprincipal={"2"}
            estEstado={contrasenia}
            estCambiarEstado={cambiarContrasenia}
            bolTipo={false}
            cadPlaceholder={"Contraseña"}
            cadNombre={"contraseña"}
            exprExpresionR={expresiones.password}
          />
        </div>
        <div className="boton">
          <CmpBotonPrincipal
            cadTipofuncion={"8"}
            cadMensaje={"Mensaje de prueba"}
            // funcion={}
            cadTipo={"1"}
            cadTexto={"Ingresar"}
          />
        </div>
        <div className="boton2">
          <CmpBotonPrincipal
            cadTipofuncion={"8"}
            cadMensaje={"Mensaje de prueba"}
            // funcion={}
            cadTipo={"5"}
            cadTexto={"Olvide mi Contraseña"}
          />
        </div>
      </ElmContVStIns>
      <ElmCont2VStIns>
        <div></div>
      </ElmCont2VStIns>
    </ELmVStIns>
  );
};
export default VstIns;
