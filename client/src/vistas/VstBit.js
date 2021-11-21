/*
SlimeDev
VstBit - Vista
Fecha de creación: 10/11/2021 
  - Responsable: 
      Alan Alexis Vélazquez Romero,
      César Pedraza Hernández, 
      David Velazquez Ramirez
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
-19/11/2021 - Correciones 
Archivos relacionados: 
    Elementos.js, 
    CmpBotonPrincipal.js, 
    CmpTextoForm.js, 
    CmpBotonMenu.js, 
    CmpTextoBuscar.js,
    CmpTablas.js,
*/
import React, { useEffect, useState } from "react";
//importacion de Elementos graficos

import { Cadenas, Colores, ElmContNt, ElmVstNt } from "../Elementos/Elementos";
import { useHistory } from "react-router-dom";
//Importacion Componentes
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTablas from "../components/CmpTablas";

import firebase from "./../bd/conexion";

const VstBit = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  //Variables Complementarias//Variables Complementarias

  const titulosTab = [
    { id: "Nombre empleado" },
    { id: "Movimiento" },
    { id: "Fecha de movimiento" },
    { id: "Monto resultante del movimiento" },
  ];
  const data = [
    {
      id: "1",
      a: "name",
      b: "Apellido",
      c: "Edad",
    },
  ];
  const history = useHistory();
  //Funciones
  const irInicio = () => {
    var length=history.length;     
    history.go(-length);
    window.location.replace("/");
  };
  const irNotas = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/2");
  };
  const irProductos = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/3");
  };
  const irClientes = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/4");
  };
  const irEntregas = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/5");
  };
  const irProveedores = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/6");
  };
  const irBitacora = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/7");
  };
  const irRegistro = () => {
    var length=history.length;     
    history.go(-length);
    history.replace("/1");
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
  
  useEffect(() => {
    
    const ac = new AbortController();
    
    var mensaje = ""

    firebase.auth().onAuthStateChanged(function(user) {
      if(user != null){
        ac.abort()
        mensaje = 'Se restablecio la sesion para: ' + user.email;
        console.log(mensaje)
      } else {
        mensaje = 'La sesion caduco'
        console.log(mensaje)
        ac.abort()
        setTimeout(()=>{
          irInicio()
        }, 0);
      }
    })

    return () => ac.abort();
  });

  const cerrarSesion = async () =>{
    await firebase.auth().signOut().then(() => {
      console.log('Se cerro sesion')
      setTimeout(()=>{
        irInicio()
      }, 0);
    }).catch((error) => {
      console.log(error)
    });
  }

  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstBit}</div>
        <CmpBotonMenu
          funcion={Rutas[2]}
          cadicono="1"
          cadTipo="1"
          cadTexto={Cadenas.vstNt}
        />
        <CmpBotonMenu
          funcion={Rutas[3]}
          cadicono="2"
          cadTipo="1"
          cadTexto={Cadenas.vstPdts}
        />
        <CmpBotonMenu
          funcion={Rutas[4]}
          cadicono="3"
          cadTipo="1"
          cadTexto={Cadenas.vstAbns}
        />
        <CmpBotonMenu
          funcion={Rutas[5]}
          cadicono="4"
          cadTipo="1"
          cadTexto={Cadenas.vstEtgs}
        />
        <CmpBotonMenu
          funcion={Rutas[6]}
          cadicono="5"
          cadTipo="1"
          cadTexto={Cadenas.vstPvds}
        />
        <CmpBotonMenu cadicono="6" cadTipo="2" cadTexto={Cadenas.vstBit} />
        <CmpBotonMenu
          funcion={Rutas[8]}
          cadicono="8"
          cadTipo="1"
          cadTexto={Cadenas.vstReg}
        />
        <CmpBotonPrincipal
          cadTipofuncion="6"
          funcion={() => cerrarSesion()}
          cadTipo="4"
          cadTexto={Cadenas.cerrarSesion}
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
              columnas={"4"}
              titulos={titulosTab}
              datos={data}
              tipodatos="4"
            />
          </div>
        </ElmContNt>
      </div>
    </ElmVstNt>
  );
};
export default VstBit;
