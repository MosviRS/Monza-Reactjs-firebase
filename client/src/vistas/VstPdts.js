/*
SlimeDev
VstPdts - Vista
Fecha de creación: 10/11/2021 
  - Responsable: 
      César Pedraza Hernández, 
      Alan Alexis Vélazquez Romero, 
      Carlos López Palma,
      Diego Cruz Barajas,
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
import {
  Cadenas,
  Colores,
  ElmContNt,
  ElmFormNt,
  ElmVstNt,
} from "../Elementos/Elementos";
import { useHistory } from "react-router-dom";
//Importacion Componentes
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTablas from "../components/CmpTablas";

import firebase from "./../bd/conexion";

const VstPdts = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [precio, cambiarPrecio] = useState({ campo: "", valido: null });
  const [cantidad, cambiarCantidad] = useState({ campo: "", valido: null });
  const [marca, cambiarMarca] = useState({ campo: "", valido: null });
  const [categoria, cambiarCategoria] = useState({ campo: "", valido: null });
  //Variables Complementarias
  const titulosTab = [
    { id: "Modelo" },
    { id: "Nombre del Producto" },
    { id: "Precio" },
    { id: "Existencia" },
    { id: "Marca" },
    { id: "Proveedor" },
  ];
  const data = [
    {
      id: "1",
      a: "name",
      b: "$00.00",
      c: "100",
      d: "XXXX",
      e: "XXXX",
    },
    {
      id: "2",
      a: "name",
      b: "$00.00",
      c: "100",
      d: "XXXX",
      e: "XXXX",
    },
    {
      id: "3",
      a: "name",
      b: "$00.00",
      c: "100",
      d: "XXXX",
      e: "XXXX",
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
        <div className="titulo">{Cadenas.vstPdts}</div>
        <CmpBotonMenu
          funcion={Rutas[2]}
          cadicono="1"
          cadTipo="1"
          cadTexto={Cadenas.vstNt}
        />
        <CmpBotonMenu cadicono="2" cadTipo="2" cadTexto={Cadenas.vstPdts} />
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
        <CmpBotonMenu
          funcion={Rutas[7]}
          cadicono="6"
          cadTipo="1"
          cadTexto={Cadenas.vstBit}
        />
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
      <div className="contenedor2">
        <div className="subCont1">
          <ElmContNt>
            <div className="titulo">Lista de productos</div>
            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Filtrar Productos"
              cadNombre="busqueda"
            />
            <div className="tabla">
              <CmpTablas
                titulos={titulosTab}
                datos={data}
                tipodatos="3"
                columnas="6"
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Registro / Actualización de productos</div>
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={nombre}
              estCambiarEstado={cambiarNombre}
              bolTipo={true}
              cadEtiqueta="Nombre del Producto:"
              cadPlaceholder="Escritorio"
              cadLeyenda="Nombre del producto"
              bolObligatorio={true}
              cadNombre="nombre"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={precio}
              estCambiarEstado={cambiarPrecio}
              bolTipo={true}
              cadEtiqueta="Precio Unitario:"
              cadPlaceholder="$ 0000.00"
              cadLeyenda="Precio del producto"
              bolObligatorio={true}
              cadNombre="precio"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={cantidad}
              estCambiarEstado={cambiarCantidad}
              bolTipo={true}
              cadEtiqueta="Cantidad:"
              cadPlaceholder="7"
              cadLeyenda="Cantidad del producto"
              bolObligatorio={true}
              cadNombre="Cantidad"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={marca}
              estCambiarEstado={cambiarMarca}
              bolTipo={true}
              cadEtiqueta="Marca/Proveedor:"
              cadPlaceholder="Don Pancho"
              cadLeyenda="Marca/Proveedor"
              bolObligatorio={true}
              cadNombre="Marca"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={categoria}
              estCambiarEstado={cambiarCategoria}
              bolTipo={true}
              cadEtiqueta="Categoria:"
              cadPlaceholder="Mueble"
              cadLeyenda="Categoria"
              bolObligatorio={true}
              cadNombre="Categoria"
            />
            <CmpBotonPrincipal
              cadTipofuncion="6"
              cadTipo="3"
              funcion={() => console.log("click")}
              cadTexto="Guardar"
              cadMensaje="¿Desea guardar o actualizar los datos?"
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstPdts;
