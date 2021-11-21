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
import React, { useState,useEffect } from "react";
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
import firebase from "../bd/conexion";
import {guardarProductos} from "../bd/servicios";

const VstPdts = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [tablaProducto,cambiarTablaProducto] =useState({});
  const [tablaFiltrada,cambiarTablaFiltrada] =useState({});
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [precio, cambiarPrecio] = useState({ campo: "", valido: null });
  const [cantidad, cambiarCantidad] = useState({ campo: "", valido: null });
  const [marca, cambiarMarca] = useState({ campo: "", valido: null });
  const [modelo, cambiarModelo] = useState({ campo: "", valido: null });
  const expresiones = {
    nombre: /^[A-Za-z]{4,50}$/, // Letras
    precio: /^[0-9]|[0-9]+([.][0-9]+){1,15}$/, // Letras y espacios, pueden llevar acentos.
    cantidad:/^\d{1,15}$/, // 4 a 12 digitos.
    marca: /^[A-Za-z]{4,50}$/,//
    modelo:/^[a-zA-Z0-9_-]{4,16}$/, // 7 a 14 numeros.
  };
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
  useEffect(() => {
    firebase.db.collection("producto").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      cambiarTablaProducto(docs);
      //console.log(docs);
    });
  }, []);

  const filtradoProductos = ()=>{
    cambiarTablaFiltrada(
      tablaProducto.filter(function(item){
        return item.nombre
          .toString()
          .toLowerCase()
          .includes(busqueda.campo.toLowerCase());
      })
    );
  };
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
          funcion={Rutas[1]}
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
              cadLeyenda="Solo se admiten letras"
              bolObligatorio={true}
              cadNombre="nombre"
              exprExpresionR={expresiones.nombre}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={precio}
              estCambiarEstado={cambiarPrecio}
              bolTipo={true}
              cadEtiqueta="Precio Unitario:"
              cadPlaceholder="$ 0000.00"
              cadLeyenda="Solo se admiten numeros"
              bolObligatorio={true}
              cadNombre="precio"
              exprExpresionR={expresiones.precio}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={cantidad}
              estCambiarEstado={cambiarCantidad}
              bolTipo={true}
              cadEtiqueta="Cantidad:"
              cadPlaceholder="7"
              cadLeyenda="Solo se admiten numeros"
              bolObligatorio={true}
              cadNombre="Cantidad"
              exprExpresionR={expresiones.cantidad}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={marca}
              estCambiarEstado={cambiarMarca}
              bolTipo={true}
              cadEtiqueta="Marca/Proveedor:"
              cadPlaceholder="Don Pancho"
              cadLeyenda="Solo se admiten letras"
              bolObligatorio={true}
              cadNombre="Marca"
              exprExpresionR={expresiones.marca}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={modelo}
              estCambiarEstado={cambiarModelo}
              bolTipo={true}
              cadEtiqueta="Modelo:"
              cadPlaceholder="Mueble"
              cadLeyenda="Solo se admiten letras"
              bolObligatorio={true}
              cadNombre="Modelo"
              exprExpresionR={expresiones.modelo}
            />
            <CmpBotonPrincipal
              cadTipofuncion="6"
              cadTipo="3"
              funcion={() => guardarProductos(cantidad,marca,modelo,nombre,precio)}
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
