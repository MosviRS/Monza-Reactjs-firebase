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
import { MostrarAlerta1, MostrarAlerta3 } from "../components/CmpAlertas";
import firebase from "./../bd/conexion";
import {guardarMovimientos} from "../bd/servicios";

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
  const [listaProd, cambiarlistaProd] = useState([]);
  const [tablaProducto, cambiartablaProducto] = useState([]);
  const [filtroProd, cambiarFiltroProd] = useState([]);
  const [cliente, cambiarCliente] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [apellidoP, cambiarApellidoP] = useState({ campo: "", valido: null });
  const [apellidoM, cambiarApellidoM] = useState({ campo: "", valido: null });
  const [direccion, cambiarDireccion] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [pago, cambiarPago] = useState({ campo: "", valido: null });
  const [total, cambiarTotal] = useState({ campo: 0, valido: null });
  const [totalRec, cambiarTotalRec] = useState({ campo: "", valido: null });
  const [cant, cambiarCant] = useState({ campo: 0, valido: null });
  const [productoU, cambiarProductoU] = useState({ campo: "", id: "" });
  const [Referencias, cambiarReferencias] = useState({
    campo: "",
    valido: null,
  });
  const [usuario,setDataUsuario]=useState({campo:"",id:""});
  //Variables Complementarias
  const expresiones = {
    cantidad: /^\d+/, // 7 a 14 numeros. Letras y espacios, pueden llevar acentos.
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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        const email = user.email

        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);

        firebase.db.collection("usuario").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((user) => {
            const usuarioObtenido = user.data()
            if(email === usuarioObtenido['correo']){
              if(usuarioObtenido['tipo_usuario'] === 'Gerente'){
                definirbtnControl(false)     
              } else if(usuarioObtenido['tipo_usuario'] === 'Vendedor'){
                definirbtnControl(true)
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

    firebase.db.collection("producto").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      cambiartablaProducto(docs);
      // console.log(docs);
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
  // console.log(control);
  // console.log(tablaProducto);

  //rederizacion
  return (
    <ElmVstNt subCont1="20px">
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstNt}</div>
        <CmpBotonMenu 
          bolVisibilidad={true}
          cadicono="1" 
          cadTipo="2" 
          cadTexto={Cadenas.vstNt} />

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
                tipoDatos="2"
                arrLista={filtroProd}
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
              estEstado={busquedaCliente}
              estCambiarEstado={cambiarBusquedaCliente}
              cadPlaceholder="Buscar cliente"
              cadNombre="busquedacliente"
            />

            <CmpCajaCombo
              tipodatos="1"
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
              bolVisibilidad={true}
              cadTipofuncion="6"
              cadTipo="3"
              funcion={() => 
                guardarMovimientos(fechaEnt,usuario,pago)
              }
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
