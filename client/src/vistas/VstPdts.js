/*
SlimeDev
VstPdts - Vista
Fecha de creación: 10/11/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
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
import React, { useState } from "react";
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
