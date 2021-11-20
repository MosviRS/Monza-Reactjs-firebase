/*
SlimeDev
VstReg - Vista
Fecha de creación: 10/11/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
-19/11/2021 - Correciones 
Archivos relacionados: Elementos.js, CmpBotonPrincipal.js CmpTextoForm.js CmpCajaCombo.js, 
*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//importacion de Elementos graficos
import {
  ElmCont2VStReg,
  ElmContVStReg,
  ELmVStIns,
} from "../Elementos/Elementos";
//Importacion Componentes
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpCajaCombo from "../components/CmpCajaCombo";
const VstReg = () => {
  //Estilo del Fondo
  document.body.style =
    "background: url( https://cdn.discordapp.com/attachments/900274199954849819/909886266085081139/toa-heftiba-FV3GConVSss-unsplash.jpg ) ;" +
    "background-repeat: no-repeat;" +
    "background-position: center center;" +
    "@media (max-width: 1000px) {background-size: auto; }";

  //Variables estado
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [apPaterno, cambiarApPaterno] = useState({ campo: "", valido: null });
  const [apMaterno, cambiarApMaterno] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [repContra, cambiarRepContra] = useState({ campo: "", valido: null });
  const [pregunta, cambiarPregunta] = useState({ campo: "", valido: null });
  const [respuesta, cambiarRespuesta] = useState({ campo: "", valido: null });
  const [contrasenia, cambiarContrasenia] = useState({
    campo: "",
    valido: null,
  });

  //Variables Complementarias
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  const preguntas = [
    { id: "1", nombre: "A" },
    { id: "2", nombre: "B" },
    { id: "3", nombre: "C" },
    { id: "4", nombre: "D" },
    { id: "5", nombre: "F" },
    { id: "6", nombre: "G" },
    { id: "7", nombre: "H" },
    { id: "8", nombre: "I" },
  ];
  const history = useHistory();
  //Funciones
  const validarcontraseña2 = () => {
    if (contrasenia.campo.length > 0) {
      if (contrasenia.campo !== repContra.campo) {
        cambiarRepContra((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarRepContra((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };
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
  //rederizacion
  return (
    <ELmVStIns>
      <ElmContVStReg>
        <div className="titulo">Registro</div>
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={nombre}
          estCambiarEstado={cambiarNombre}
          bolTipo={true}
          cadEtiqueta="Nombre"
          cadPlaceholder="Juan"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Nombre"}
          exprExpresionR={expresiones.nombre}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={apPaterno}
          estCambiarEstado={cambiarApPaterno}
          bolTipo={true}
          cadEtiqueta="Apellido Paterno"
          cadPlaceholder="Lopez"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"ApellidoPaterno"}
          exprExpresionR={expresiones.nombre}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={apMaterno}
          estCambiarEstado={cambiarApMaterno}
          bolTipo={true}
          cadEtiqueta="Apellido Materno"
          cadPlaceholder="Ramirez"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"ApellidoMaterno"}
          exprExpresionR={expresiones.nombre}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={correo}
          estCambiarEstado={cambiarCorreo}
          bolTipo={true}
          cadEtiqueta="Correo"
          cadPlaceholder="example32@example.com"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Correo"}
          exprExpresionR={expresiones.correo}
        />
      </ElmContVStReg>
      <ElmCont2VStReg>
        <CmpTextoForm
          cadTipoprincipal="2"
          estEstado={contrasenia}
          estCambiarEstado={cambiarContrasenia}
          bolTipo={true}
          cadEtiqueta="Contraseña"
          cadPlaceholder="Contraseña"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Contraseña"}
          exprExpresionR={expresiones.password}
        />
        <CmpTextoForm
          cadTipoprincipal="2"
          estEstado={repContra}
          estCambiarEstado={cambiarRepContra}
          bolTipo={true}
          cadEtiqueta="Repetir Contraseña"
          cadPlaceholder="Contraseña"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"RepetirContraseña"}
          funcion={validarcontraseña2}
          exprExpresionR={expresiones.password}
        />
        <CmpCajaCombo
          arrLista={preguntas}
          cadEtiqueta="Pregunta de Seguridad"
          cadNombre={"Pregunta"}
          estEstado={pregunta}
          estCambiarEstado={cambiarPregunta}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={respuesta}
          estCambiarEstado={cambiarRespuesta}
          bolTipo={true}
          cadEtiqueta="Respuesta"
          cadPlaceholder="Respuesta"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Respuesta"}
          exprExpresionR={expresiones.nombre}
        />
        <div className="botones">
          <div className="boton1">
            <CmpBotonPrincipal
              cadTipofuncion="1"
              cadTipo="1"
              funcion={Rutas[2]}
              cadTexto="Registrar"
              cadMensaje="Registro"
            />
          </div>
          <div className="boton2">
            <CmpBotonPrincipal
              cadTipofuncion="0"
              cadTipo="2"
              funcion={Rutas[2]}
              cadTexto="Regresar"
              cadMensaje="Datos Guardados correctamente"
            />
          </div>
        </div>
      </ElmCont2VStReg>
    </ELmVStIns>
  );
};
export default VstReg;
