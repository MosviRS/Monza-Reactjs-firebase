/*
SlimeDev
VstBit - Vista
Fecha de creación: 10/11/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: 
    Elementos.js, 
    CmpBotonPrincipal.js, 
    CmpTextoForm.js, 
    CmpBotonMenu.js, 
    CmpTextoBuscar.js,
    CmpTablas.js,
*/
import React, { useState } from "react";
//importacion de Elementos graficos
import { Colores, ElmContNt, ElmVstNt } from "../Elementos/Elementos";
import { useHistory } from "react-router-dom";
//Importacion Componentes
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTablas from "../components/CmpTablas";
const VstBit = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  //Variables Complementarias//Variables Complementarias

  const titulosTab = [
    { id: "Usuario" },
    { id: "Nombre empleado" },
    { id: "Movimiento" },
    { id: "Monto resultante del movimiento" },
    { id: "Title5" },
  ];
  const data = [
    {
      id: "1",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "Email",
    },
    {
      id: "2",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "Email",
    },
    {
      id: "3",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "Email",
    },
    {
      id: "4",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "Email",
    },
    {
      id: "5",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "Email",
    },
  ];
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
  const irRegistro = () => {
    history.push("/1");
  };
  const Rutas = {
    1: irInicio,
    2: irNotas,
    3: irProductos,
    4: irClientes,
    5: irEntregas,
    6: irProveedores,
    7: irBitacora,
    8: irRegistro,
  };
  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">Bitacora</div>
        <CmpBotonMenu
          funcion={Rutas[2]}
          cadicono="1"
          cadTipo="1"
          cadTexto="Notas"
        />
        <CmpBotonMenu
          funcion={Rutas[3]}
          cadicono="2"
          cadTipo="1"
          cadTexto="Productos"
        />
        <CmpBotonMenu
          funcion={Rutas[4]}
          cadicono="3"
          cadTipo="1"
          cadTexto="Abonos"
        />
        <CmpBotonMenu
          funcion={Rutas[5]}
          cadicono="4"
          cadTipo="1"
          cadTexto="Entregas"
        />
        <CmpBotonMenu
          funcion={Rutas[6]}
          cadicono="5"
          cadTipo="1"
          cadTexto="Proveedores"
        />
        <CmpBotonMenu cadicono="6" cadTipo="2" cadTexto="Bitacora" />
        <CmpBotonMenu
          funcion={Rutas[8]}
          cadicono="8"
          cadTipo="1"
          cadTexto="Registro de personal"
        />
        <CmpBotonPrincipal
          cadTipofuncion="6"
          funcion={Rutas[1]}
          cadTipo="4"
          cadTexto="Cerrar Sesión"
          cadMensaje="¿Desea cerrar sesión?"
        />
      </div>
      <div className="contenedor3">
        <ElmContNt>
          <div className="titulo">Registros</div>

          <CmpTextoBuscar
            estEstado={busqueda}
            estCambiarEstado={cambiarBusqueda}
            cadPlaceholder="Filtrar"
            cadNombre="busqueda"
          />
          <div className="tabla">
            <CmpTablas
              columnas={"5"}
              titulos={titulosTab}
              datos={data}
              tipodatos="1"
            />
          </div>
        </ElmContNt>
      </div>
    </ElmVstNt>
  );
};
export default VstBit;
