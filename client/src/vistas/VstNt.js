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
import { faCapsules, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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
import {
  MostrarAlerta1,
  MostrarAlerta2,
  MostrarAlerta3,
} from "../components/CmpAlertas";
import firebase from "./../bd/conexion";
import { guardarMovimientos, guardarClientes, guardarVentas, crearAbonos, agregarProdxVenta, actualizar, agregarEntrega } from "../bd/servicios";
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

const VstNt = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [fechaComp, setFechaComp] = useState(new Date());
  const [fechaEnt, setFechaEnt] = useState(new Date());

  const [btnControl, definirbtnControl] = useState(null);

  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [busquedaCliente, cambiarBusquedaCliente] = useState({
    campo: "",
    valido: null,
  });
  const [botonControl, camBotonControl] = useState(true);
  const [listaProd, cambiarlistaProd] = useState([]);
  const [tablaClientes, cambiartablaClientes] = useState([]);
  const [tablaProducto, cambiartablaProducto] = useState([]);
  const [filtroClient, cambiarFiltroClient] = useState([]);
  const [filtroProd, cambiarFiltroProd] = useState([]);
  const [cliente, cambiarCliente] = useState({ campo: "", valido: "", id: "" });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: "" });
  const [apellidoP, cambiarApellidoP] = useState({ campo: "", valido: "" });
  const [apellidoM, cambiarApellidoM] = useState({ campo: "", valido: "" });
  const [direccion, cambiarDireccion] = useState({ campo: "", valido: "" });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: "" });
  const [pago, cambiarPago] = useState({ campo: "", valido: "" });
  const [total, cambiarTotal] = useState({ campo: 0, valido: "" });
  const [totalRec, cambiarTotalRec] = useState({ campo: "", valido: "" });
  const [cant, cambiarCant] = useState({ campo: 0, valido: "" });
  const [productoU, cambiarProductoU] = useState({ campo: "", id: "" });
  const [Referencias, cambiarReferencias] = useState({ campo: "", valido: "" });
  const [uid, cambiarUid] = useState( "" );
  //Variables Complementarias
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /(.+?)(?:(?:first)|(?:second)|(?:third)|(?:fourth)|$)/gim, // Letras, numeros, guion, guion_bajo, punto, mas y menos, espacios
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono:
      /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/, // 7 a 14 numeros.
    cantidad: /^\d+/, // 7 a 14 numeros. Letras y espacios, pueden llevar acentos.
    decimales: /^(([1-9]\d*(.\d{2}){0,1})|(0.(([1-9]\d)|([0][1-9]))))$/gm
  };
  const titulosTab = [
    { id: "Modelo" },
    { id: "Nombre del Producto" },
    { id: "Monto Unidad" },
    { id: "Cantidad" },
    { id: "Monto Subtotal" },
    { id: "Eliminar" },
  ];
  const history = useHistory();
  //Funciones
  const irInicio = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/");
  };
  const irNotas = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/2");
  };
  const irProductos = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/3");
  };
  const irClientes = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/4");
  };
  const irEntregas = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/5");
  };
  const irProveedores = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/6");
  };
  const irBitacora = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/7");
  };
  const irRegistro = () => {
    var length = history.length;
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
    var mensaje = "";
    //Verificar la sesion
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        const email = user.email;
        cambiarUid(user.uid);
        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);
        //Verificar el tipo de usuario
        firebase.db.collection("usuario").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((user) => {
            const usuarioObtenido = user.data();
            if (email === usuarioObtenido["correo"]) {
              if (usuarioObtenido["tipo_usuario"] === "Gerente") {
                definirbtnControl(false);
              } else if (usuarioObtenido["tipo_usuario"] === "Vendedor") {
                definirbtnControl(true);
              }
            }
          });
        });
      } else {
        mensaje = "La sesion caduco";
        console.log(mensaje);
        setTimeout(() => {
          irInicio();
        }, 0);
      }
    });

    //consulta de productos
    firebase.db.collection("producto").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      cambiartablaProducto(docs);
    });
    //consulta de clientes
    firebase.db.collection("cliente").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      cambiartablaClientes(docs);
    });
  }, []);

  const cerrarSesion = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Se cerro sesion");
        setTimeout(() => {
          irInicio();
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtradoProd = () => {
    cambiarFiltroProd(
      tablaProducto.filter(function (item) {
        // console.log(item.nombre_producto);

        return item.nombre_producto
          .toString()
          .toLowerCase()
          .includes(busqueda.campo.toLowerCase());
      })
    );
  };
  const filtradoCli = () => {
    cambiarFiltroClient(
      tablaClientes.filter(function (item) {
        return item.nombre_cliente
          .toString()
          .toLowerCase()
          .includes(busquedaCliente.campo.toLowerCase());
      })
    );
  };
  const sumCant = () => {
    cambiarCant({ campo: parseInt(cant.campo) + 1 });
  };
  if (parseInt(cant.campo) < 0) {
    cambiarCant({ campo: "" });
  }

  // console.log(index);
  const validacion = () => {
    if (
      expresiones.cantidad.test(cant.campo) &&
      parseInt(cant.campo) > 0 &&
      productoU.campo !== ""
    ) {
      const aux = tablaProducto.filter((item) => {
        return item.id
          .toString()
          .toLowerCase()
          .includes(productoU.id.toLowerCase());
      });
      // console.log(aux[0].id);
      const subt =
        parseFloat(cant.campo) * parseFloat(aux[0].precio).toFixed(2);
      const lista = listaProd;
      // lista.splice(index, 1);
      lista.push({
        id: aux[0].id,
        nombre_producto: aux[0].nombre_producto,
        modelo: aux[0].modelo,
        precio: parseFloat(aux[0].precio),
        cantidad: cant.campo,
        sub_total: subt,
      });
      // setcontrol([]);
      cambiarTotal({
        campo: (parseFloat(total.campo) + subt).toFixed(2),
      });
      cambiarBusqueda({ campo: "" });
      cambiarlistaProd(lista);
      cambiarFiltroProd([]);
      cambiarCant({ campo: 0 });
      cambiarProductoU({ campo: "", id: "" });
      MostrarAlerta3("objeto añadido corectamente", () => {
        console.log("funciona");
      });
    } else {
      cambiarBusqueda({ campo: "" });
      cambiarFiltroProd([]);
      cambiarCant({ campo: 0 });
      cambiarProductoU({ campo: "", id: "" });
      MostrarAlerta1(
        "Error datos no validos, intente de nuevo",
        "Error",
        2,
        () => {
          console.log("error");
        }
      );
    }
  };
  const insertarCliente = () => {
    const aux = tablaClientes.filter((item) => {
      return item.id
        .toString()
        .toLowerCase()
        .includes(cliente.id.toLowerCase());
    });
    console.log(aux);
    cambiarNombre({ campo: aux[0].nombre_cliente, valido: "true" });
    cambiarApellidoP({ campo: aux[0].apaterno, valido: "true" });
    cambiarApellidoM({ campo: aux[0].amaterno, valido: "true" });
    cambiarDireccion({ campo: aux[0].direccion, valido: "true" });
    cambiarTelefono({ campo: aux[0].telefono, valido: "true" });
    camBotonControl(false);
  };
  const cancelEdicion = () => {
    cambiarCliente({ campo: "", valido: "", id: "" });
    cambiarNombre({ campo: "", valido: "" });
    cambiarApellidoP({ campo: "", valido: "" });
    cambiarApellidoM({ campo: "", valido: "" });
    cambiarDireccion({ campo: "", valido: "" });
    cambiarTelefono({ campo: "", valido: "" });
    camBotonControl(true);
  };

  const guardarCliente = () => {
    if(nombre.valido !== "false" && apellidoP.valido !== "false" && apellidoP.valido !== "false" && apellidoM.valido !== "false"
    && direccion.valido !== "false" && telefono.valido !== "false" && Referencias.valido !== "false" ){
      MostrarAlerta2(
        () =>
          MostrarAlerta3("Se a guardado correctamente", () => {
            guardarClientes(nombre.campo, apellidoP.campo, apellidoM.campo, direccion.campo, telefono.campo);
          }),
        "¿Desea guardar nuevo Cliente?",
        "Atencion!",
        "1"
      );
    }else{
      MostrarAlerta1("Llene todos los campos","Error","2", ()=>{});
    }
  };
  const actualizarCliente = () => {
    MostrarAlerta2(
      () =>
        MostrarAlerta3("Se a actualizar correctamente", () => {
          console.log("Actualizar cliente");
        }),
      "¿Desea actualizar nuevo Cliente?",
      "Atencion!",
      "1"
    );
  };

  const revisarPago = () => {
    var bandera = 0;
    if(total.campo !== 0){
      if(pago.campo==="contado"){
        if(totalRec.campo === total.campo){
          console.log("GUARDANDO VENTA CONTADO");
          bandera = 1;
        }else{
          MostrarAlerta1("El pago al contado es incorrecto","Error","2", ()=>{});
        }
      }else if(pago.campo==="credito"){
        if(parseFloat(totalRec.campo) <= total.campo){
          console.log("GUARDANDO VENTA CRÉDITO");
          bandera = 1;
        }else{
          MostrarAlerta1("El pago a crédito es incorrecto","Error","2", ()=>{});
        }
      }else{
        MostrarAlerta1("Seleccione un metodo de pago","Error","2", ()=>{});
      }
    }else{
      MostrarAlerta1("Agregue un producto a la lista de compra","Sin compras","2", ()=>{});
    }
    if(bandera===1){
      if(cliente.id!==""){
        var uuidVenta = uuidv1();
        console.log("uuid: "+uuidVenta);
        var uuidAbono = uuidv1();
        console.log("uuid2: "+uuidAbono);
        console.log(pago.campo);
        guardarVentas(pago.campo, fechaComp, cliente.id, total.campo, uuidVenta);
        crearAbonos(fechaComp, totalRec.campo, uuidVenta, uuidAbono );
        listaProd.map((productoLista)=>{
          agregarProdxVenta(productoLista.cantidad, productoLista.id, uuidVenta, productoLista.sub_total );
          const prod = filtroCantidad(productoLista.id, tablaProducto);
          const diferencia = prod[0].existencia - productoLista.cantidad;
          actualizar("producto", productoLista.id, {existencia: diferencia});
        });
        const mensaje = "Venta de $"+ total.campo + " con abono de $"+totalRec.campo+", de tipo " + pago.campo;
        console.log(mensaje)
        console.log(uid.campo);
        guardarMovimientos(uid, fechaComp, mensaje );
        if(Referencias.campo!==""){
          const fecha = fechaEnt.getDay()+"/"+(fechaEnt.getMonth()+1)+"/"+fechaEnt.getFullYear();
          console.log(fecha);
          const tiempo = fechaEnt.getHours()+":"+fechaEnt.getMinutes()+":"+fechaEnt.getSeconds();
          console.log(tiempo);
          agregarEntrega(fecha, tiempo, uuidVenta, Referencias.campo);
        }
        MostrarAlerta1("La venta ha sido registrada","Venta registrada","1", ()=>{});
        cambiarBusquedaCliente({campo: "", valido:""});
        cambiarCliente({campo: "", valido:"", id:""});
        cambiarNombre({campo: "", valido:""});
        cambiarApellidoP({campo: "", valido:""});
        cambiarApellidoM({campo: "", valido:""});
        cambiarDireccion({campo: "", valido:""});
        cambiarTelefono({campo: "", valido:""});
        cambiarReferencias({campo: "", valido:""});
        cambiarlistaProd([]);
        cambiarTotal({campo: 0, valido:""});
        cambiarPago({campo: "", valido:""});
        cambiarTotalRec({campo: "", valido:""});
        setFechaEnt(new Date());
      }else{
        MostrarAlerta1("Seleccione o ingrese un cliente","Cliente vacio","2", ()=>{});
      }
    }
    
  };

  const filtroCantidad = (id, tab) => {
    return tab.filter(function (item) {
      return item.id === id;
    })
  };
  // console.log(cliente);
  //rederizacion
  return (
    <ElmVstNt subCont1="20px">
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstNt}</div>
        <CmpBotonMenu
          bolVisibilidad={true}
          cadicono="1"
          cadTipo="2"
          cadTexto={Cadenas.vstNt}
        />

        <CmpBotonMenu
          bolVisibilidad={true}
          funcion={Rutas[3]}
          cadicono="2"
          cadTipo="1"
          cadTexto={Cadenas.vstPdts}
        />
        <CmpBotonMenu
          bolVisibilidad={true}
          funcion={Rutas[4]}
          cadicono="3"
          cadTipo="1"
          cadTexto={Cadenas.vstAbns}
        />
        <CmpBotonMenu
          bolVisibilidad={true}
          funcion={Rutas[5]}
          cadicono="4"
          cadTipo="1"
          cadTexto={Cadenas.vstEtgs}
        />
        <CmpBotonMenu
          bolVisibilidad={btnControl ? false : true}
          funcion={Rutas[6]}
          cadicono="5"
          cadTipo="1"
          cadTexto={Cadenas.vstPvds}
        />
        <CmpBotonMenu
          bolVisibilidad={btnControl ? false : true}
          funcion={Rutas[7]}
          cadicono="6"
          cadTipo="1"
          cadTexto={Cadenas.vstBit}
        />
        <CmpBotonMenu
          bolVisibilidad={btnControl ? false : true}
          funcion={Rutas[8]}
          cadicono="8"
          cadTipo="1"
          cadTexto={Cadenas.vstReg}
        />

        <CmpBotonPrincipal
          bolVisibilidad={true}
          cadTipofuncion="6"
          funcion={cerrarSesion}
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
              filtro={filtradoProd}
            />
            <div className="busqueda">
              <CmpCajaCombo
                funcion={() => {
                  console.log("hola");
                }}
                tipoDatos="2"
                arrLista={busqueda.campo === "" ? tablaProducto : filtroProd}
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
                <ElmIconAddProduct icon={faPlusCircle} onClick={sumCant} />
              </div>
            </div>
            <div className="tres">
              <div></div>
              <CmpBotonPrincipal
                bolVisibilidad={true}
                cadTipofuncion="0"
                funcion={validacion}
                cadTipo="1"
                cadTexto="Añadir"
                cadMensaje="¿Desea agregar producto?"
              />
            </div>
            <div className="tabla">
              <CmpTablas
                tipodatos={"7"}
                titulos={titulosTab}
                datos={listaProd}
                columnas="6"
                total={total}
                camTotal={cambiarTotal}
                cambiarDatos={cambiarlistaProd}
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Datos del cliente</div>
            <CmpTextoBuscar
              filtro={filtradoCli}
              estEstado={busquedaCliente}
              estCambiarEstado={cambiarBusquedaCliente}
              cadPlaceholder="Buscar cliente"
              cadNombre="busquedacliente"
            />

            <CmpCajaCombo
              funcion={insertarCliente}
              tipoDatos="4"
              arrLista={
                busquedaCliente.campo === "" ? tablaClientes : filtroClient
              }
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
              exprExpresionR={expresiones.nombre}
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
              exprExpresionR={expresiones.nombre}
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
              exprExpresionR={expresiones.nombre}
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
              exprExpresionR={expresiones.direccion}
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
              exprExpresionR={expresiones.telefono}
            />
            <CmpTextoArea
              estEstado={Referencias}
              estCambiarEstado={cambiarReferencias}
              bolTipo={true}
              cadEtiqueta="Referencias:"
              cadPlaceholder="Entre que calles, color de casa"
            />
            <CmpBotonPrincipal
              bolVisibilidad={botonControl}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={guardarCliente}
              cadTexto="Guardar cliente"
              cadMensaje="¿Desea guardar los datos?"
            />
            <CmpBotonPrincipal
              bolVisibilidad={!botonControl}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={actualizarCliente}
              cadTexto="Actualizar cliente"
              cadMensaje="¿Desea actualizar los datos?"
            />
            <CmpBotonPrincipal
              bolVisibilidad={!botonControl}
              cadTipofuncion="0"
              cadTipo="4"
              funcion={cancelEdicion}
              cadTexto="Cancelar"
              cadMensaje="¿Desea actualizar los datos?"
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
                exprExpresionR={expresiones.decimales}
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
              bolVisibilidad={true}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={revisarPago}
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
