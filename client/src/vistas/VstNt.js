/*
SlimeDev
VstReg - Vista
Fecha de creación: 10/11/2021 
  - Responsable: 
      César Pedraza Hernández, 
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Diego Cruz Barajas,
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
    CmpFecha, 
    CmpTextoBuscar.js,
    CmpTablas.js,
    CmpTextoArea.js,
    CmpRevisionCaja.js,
*/
import React, { useState, useEffect } from "react";
//importacion de Elementos graficos
import {
  Cadenas,
  Colores,
  ElmContNt,
  ElmEncabezadoNt,
  ElmFormNt,
  ElmIconAddProduct,
  ElmVstNt,
} from "../Elementos/Elementos";
import { useHistory } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
//Importacion Componentes
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpFecha from "../components/CmpFecha";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTablas from "../components/CmpTablas";
import CmpTextoArea from "../components/CmpTextoArea";
import CmpRevisionCaja from "../components/CmpRevisionCaja";
import CmpCajaCombo from "../components/CmpCajaCombo";
import { tomarTabla } from "../bd/servicios";

import firebase from "./../bd/conexion";

const VstNt = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [fechaComp, setFechaComp] = useState(new Date());
  const [fechaEnt, setFechaEnt] = useState(new Date());
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [busquedaCliente, cambiarBusquedaCliente] = useState({
    campo: "",
    valido: null,
  });
  const [tablaProducto, cambiartablaProducto] = useState([]);
  const [cliente, cambiarCliente] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [apellidoP, cambiarApellidoP] = useState({ campo: "", valido: null });
  const [apellidoM, cambiarApellidoM] = useState({ campo: "", valido: null });
  const [direccion, cambiarDireccion] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [pago, cambiarPago] = useState({ campo: "", valido: null });
  const [total, cambiarTotal] = useState({ campo: "$ 0000.00", valido: null });
  const [totalRec, cambiarTotalRec] = useState({ campo: "", valido: null });
  const [cant, cambiarCant] = useState({ campo: "", valido: null });
  const [productoU, cambiarProductoU] = useState({ campo: "", valido: null });
  const [Referencias, cambiarReferencias] = useState({
    campo: "",
    valido: null,
  });
  //Variables Complementarias
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
  const titulosTab = [
    { id: "Modelo" },
    { id: "Nombre del Producto" },
    { id: "Monto Unidad" },
    { id: "Monto Subtotal" },
    { id: "Cantidad" },
    { id: "Eliminar" },
  ];
  const data = [
    {
      id: "1",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "0",
    },
    {
      id: "2",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "0",
    },
    {
      id: "3",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "0",
    },
    {
      id: "4",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "0",
    },
    {
      id: "5",
      nombre: "name",
      apellido: "Apellido",
      edad: "Edad",
      email: "0",
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

  const cerrarSesion = () =>{

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Se cerro sesion')
      irInicio();

    }).catch((error) => {
      // An error happened.
      console.log('Ocurrio un error al intentar cerrar sesion')
    });
  }




  // useEffect(() => {
  //   tomarTabla(tablaProducto, "producto");
  // }, []);
  useEffect(() => {
    firebase.db.collection("producto").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      cambiartablaProducto(docs);
      console.log(docs);
    });
  }, []);
  //rederizacion
  return (
    <ElmVstNt subCont1="20px">
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstNt}</div>
        <CmpBotonMenu cadicono="1" cadTipo="2" cadTexto={Cadenas.vstNt} />
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
          <ElmEncabezadoNt>
            <div className="cont1">
              <CmpFecha
                estEstado={fechaComp}
                estCambiarEstado={setFechaComp}
                cadNombre="fechaCompra"
                cadEtiqueta="Fecha de Compra:"
                bolObligatorio={true}
              />
            </div>
            <div className="cont2">
              <CmpFecha
                estEstado={fechaEnt}
                estCambiarEstado={setFechaEnt}
                cadNombre="fechaEntrega"
                cadEtiqueta="Fecha de Entrega:"
                bolObligatorio={true}
              />
            </div>
          </ElmEncabezadoNt>
          <ElmContNt>
            <div className="titulo">Lista de productos</div>
            <div></div>
            <div></div>

            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Buscar"
              cadNombre="busqueda"
            />
            <div className="busqueda">
              <CmpCajaCombo
                tipodatos="1"
                arrLista={preguntas}
                cadEtiqueta="Resultado productos:"
                cadNombre={"productoU"}
                estEstado={productoU}
                estCambiarEstado={cambiarProductoU}
              />
            </div>
            <div className="busqueda">
              <CmpTextoForm
                cadTipoprincipal="1"
                estEstado={cant}
                estCambiarEstado={cambiarCant}
                bolTipo={true}
                cadEtiqueta="Cantidad"
                cadPlaceholder="0"
                bolObligatorio={false}
                cadNombre="cantidad"
              />
              <div>
                <div>
                  <br></br>
                </div>
                <ElmIconAddProduct
                  icon={faPlusCircle}
                  onClick={() => console.log("click")}
                />
              </div>
            </div>
            <div className="tres">
              <div></div>
              <CmpBotonPrincipal
                cadTipofuncion="2"
                funcion={() => {
                  console.log("hola");
                }}
                cadTipo="1"
                cadTexto="Añadir"
                cadMensaje="¿Desea agregar producto?"
              />
            </div>
            <div className="tabla">
              <CmpTablas
                titulos={titulosTab}
                datos={data}
                tipodatos="1"
                columnas="6"
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Datos del cliente</div>
            <CmpTextoBuscar
              estEstado={busquedaCliente}
              estCambiarEstado={cambiarBusquedaCliente}
              cadPlaceholder="Buscar cliente"
              cadNombre="busquedacliente"
            />

            <CmpCajaCombo
              arrLista={preguntas}
              cadEtiqueta="Resultado clientes:"
              cadNombre={"Cliente"}
              estEstado={cliente}
              estCambiarEstado={cambiarCliente}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={nombre}
              estCambiarEstado={cambiarNombre}
              bolTipo={true}
              cadEtiqueta="Nombre(s):"
              cadPlaceholder="Laura"
              cadLeyenda="Nombre del cliente"
              bolObligatorio={true}
              cadNombre="nombre"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={apellidoP}
              estCambiarEstado={cambiarApellidoP}
              bolTipo={true}
              cadEtiqueta="Apellido Paterno:"
              cadPlaceholder="Ortiz"
              cadLeyenda="Apellidos del cliente"
              bolObligatorio={true}
              cadNombre="apellidoM"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={apellidoM}
              estCambiarEstado={cambiarApellidoM}
              bolTipo={true}
              cadEtiqueta="Apellido Materno:"
              cadPlaceholder="Apolizar"
              cadLeyenda="Apellidos del cliente"
              bolObligatorio={true}
              cadNombre="apellidoP"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={direccion}
              estCambiarEstado={cambiarDireccion}
              bolTipo={true}
              cadEtiqueta="Direccion/Domicilio:"
              cadPlaceholder="Calle Lagos #42 Col. Lagos C.P.43122"
              cadLeyenda="Direccion del cliente"
              bolObligatorio={true}
              cadNombre="Direccion"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={telefono}
              estCambiarEstado={cambiarTelefono}
              bolTipo={true}
              cadEtiqueta="Telefono:"
              cadPlaceholder="7228642597"
              cadLeyenda="Telefono del cliente"
              bolObligatorio={true}
              cadNombre="Telefono"
            />
            <CmpTextoArea
              estEstado={Referencias}
              estCambiarEstado={cambiarReferencias}
              bolTipo={true}
              cadEtiqueta="Referencias:"
              cadPlaceholder="Entre que calles, color de casa"
            />
            <div className="titulo">Conclusión de pago</div>
            <div className="conjunto1">
              <CmpTextoForm
                cadTipoprincipal="3"
                estEstado={total}
                estCambiarEstado={cambiarTotal}
                bolTipo={true}
                bolObligatorio={false}
                cadEtiqueta="Monto total:"
                cadNombre="total"
              />
            </div>
            <div className="conjunto2">
              <CmpRevisionCaja
                estEstado={pago}
                estCambiarEstado={cambiarPago}
              />
            </div>
            <div className="conjunto1">
              <CmpTextoForm
                cadTipoprincipal="1"
                estEstado={totalRec}
                estCambiarEstado={cambiarTotalRec}
                bolTipo={true}
                bolObligatorio={false}
                cadEtiqueta="Monto Recibido:"
                cadNombre="Total recibido"
                cadPlaceholder="$ 0000.00"
                cadLeyenda="Solo valores numericos decimales"
              />
            </div>
            <CmpBotonPrincipal
              cadTipofuncion="6"
              cadTipo="3"
              funcion={() => console.log("click")}
              cadTexto="Pagar"
              cadMensaje="¿Todos los datos son correcto en la venta?"
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstNt;
