/*
SlimeDev
VstIns - Vista
Fecha de creación: 16/10/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Uriel Garcia Martinez,
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-8/11/2021 Creacion de la vista VstIns
-15/11/2021 Correcciones en comentarios
-19/11/2021 - Correciones 
Archivos relacionados: Elementos.js, CmpTexto.js, CmpBotonPrincipal.js
*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  // Estilo del fondo
  document.body.style = "background:" + Colores.ColHueso + ";";

  // Variables de estado
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [contrasenia, cambiarContrasenia] = useState({
    campo: "",
    valido: null,
  });

  //Variables complementarias
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  const history = useHistory();
  //Funciones
  const irInicio = () => {
    history.push("/");
  };
  const irNotas = () => {
    history.push("/2");
  };
  const irProductos = () => {
    history.push("/3");
  };
  const irClientes = () => {
    history.push("/4");
  };
  const irEntregas = () => {
    history.push("/5");
  };
  const irProveedores = () => {
    history.push("/6");
  };
  const irBitacora = () => {
    history.push("/7");
  };
  const Rutas = {
    1: irInicio,
    2: irNotas,
    3: irProductos,
    4: irClientes,
    5: irEntregas,
    6: irProveedores,
    7: irBitacora,
  };
  const titulosTab = [
    { id: "ID (Modelo)" },
    { id: "Nombre del Proyecto" },
    { id: "Cantidad" },
    { id: "Monto Unidad" },
    { id: "Monto Subtotal" },
  ];

  //rederizacion
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
            funcion={Rutas[2]}
            cadTipo={"1"}
            cadTexto={"Ingresar"}
          />
        </div>
        <div className="boton2">
          <CmpBotonPrincipal
            cadTipofuncion={"8"}
            cadMensaje={"Mensaje de prueba"}
            funcion={() => console.log("click")}
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
