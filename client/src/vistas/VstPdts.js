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

import React, { useState, useEffect } from "react";
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
import CmpCajaCombo from "../components/CmpCajaCombo";
import firebase from "../bd/conexion";
import { guardarProductos, actualizar } from "../bd/servicios";
import {
  MostrarAlerta1,
  MostrarAlerta2,
  MostrarAlerta3,
} from "../components/CmpAlertas";

const VstPdts = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [btnControl, definirbtnControl] = useState(null);
  const [index, camIndex] = useState("");
  const [prodEdit, camprodEdit] = useState([
    {
      modelo: "",
      nombre: "",
      precio: "",
      cantidad: "",
      marca: "",
      proveedor: "",
    },
  ]);
  const [botonControl, camBotonControl] = useState(true);
  const [tablaProducto, cambiarTablaProducto] = useState([]);
  const [tablaProveedor, cambiarTablaProveedor] = useState([]);
  const [tablaFiltrada, cambiarTablaFiltrada] = useState([]);
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [precio, cambiarPrecio] = useState({ campo: "", valido: null });
  const [cantidad, cambiarCantidad] = useState({ campo: "", valido: null });
  const [marca, cambiarMarca] = useState({ campo: "", valido: null });
  const [proveedor, cambiarProveedor] = useState({ campo: "", id: "" });
  const [modelo, cambiarModelo] = useState({ campo: "", valido: null });
  const expresiones = {
    nombre: /^[A-Za-z ]{4,50}$/, // Letras
    precio: /^[0-9]|[0-9]+([.][0-9]+){1,15}$/, // Letras y espacios, pueden llevar acentos.
    cantidad: /^\d{1,15}$/, // 4 a 12 digitos.
    marca: /^[A-Za-z]{4,50}$/, //
    modelo: /^[a-zA-Z0-9_-]{4,16}$/, // 7 a 14 numeros.
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
        const email = user.email;

        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);

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

  //proceso antes de la renderizacion de react
  useEffect(() => {
    //Consulta de productos
    firebase.db.collection("producto").onSnapshot((querySnapshot) => {
      const DatosProductos = [];
      querySnapshot.forEach((doc) => {
        DatosProductos.push({ ...doc.data(), id: doc.id });
      });
      cambiarTablaProducto(DatosProductos);
      console.log(DatosProductos);
    });
    firebase.db.collection("proveedor").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      cambiarTablaProveedor(docs);
      //console.log(docs);
    });
  }, []);

  //Filtro de productos
  const filtradoProductos = () => {
    cambiarTablaFiltrada(
      tablaProducto.filter(function (item) {
        if (
          item.nombre_producto
            .toLowerCase()
            .includes(busqueda.campo.toLowerCase())
        ) {
          return item.nombre_producto.toString();
        }
      })
    );
  };
  console.log(proveedor.id);

  const guardarProducto = () => {
    if (
      modelo.valido === "true" &&
      nombre.valido === "true" &&
      precio.valido === "true" &&
      cantidad.valido === "true" &&
      marca.valido === "true" &&
      proveedor.campo !== ""
    ) {
      MostrarAlerta2(
        () =>
          MostrarAlerta3("Datos Guardados Correctamente", () => {
            guardarProductos(
              cantidad,
              marca,
              modelo,
              nombre,
              precio,
              proveedor
            );
          }),
        "¿Desaea Guardar datos?",
        "Pregunta!",
        "4"
      );

      camprodEdit([
        {
          modelo: "",
          nombre: "",
          precio: "",
          cantidad: "",
          marca: "",
          proveedor: "",
        },
      ]);
      cambiarModelo({ campo: "", valido: "" });
      cambiarNombre({ campo: "", valido: "" });
      cambiarPrecio({ campo: "", valido: "" });
      cambiarCantidad({ campo: "", valido: "" });
      cambiarMarca({ campo: "", valido: "" });
      cambiarProveedor({ campo: "", id: "" });
      camBotonControl(true);
    } else {
      MostrarAlerta1("Favor revice todos los campos", "Error!", "2", () => {
        console.log("error");
      });
    }
  };

  //limpiar campos del proveedor
  const cancelEdicion = () => {
    camprodEdit([
      {
        modelo: "",
        nombre: "",
        precio: "",
        cantidad: "",
        marca: "",
        proveedor: "",
      },
    ]);
    cambiarModelo({ campo: "", valido: "" });
    cambiarNombre({ campo: "", valido: "" });
    cambiarPrecio({ campo: "", valido: "" });
    cambiarCantidad({ campo: "", valido: "" });
    cambiarMarca({ campo: "", valido: "" });
    cambiarProveedor({ campo: "", id: "" });
    camBotonControl(true);
  };

  const actualizarProducto = () => {
    if (
      modelo.campo !== "" &&
      nombre.campo !== "" &&
      precio.campo !== "" &&
      cantidad.campo !== "" &&
      marca.valido === "true" &&
      proveedor.campo !== ""
    ) {
      MostrarAlerta2(
        () =>
          MostrarAlerta3("Datos Actualizados Correctamente", () => {
            actualizar("producto", index, {
              modelo: modelo.campo,
              nombre_producto: nombre.campo,
              precio: precio.campo,
              existencia: cantidad.campo,
              marca: marca.campo,
              proveedor: proveedor.campo,
            });
          }),
        "¿Desaea Actualizar datos?",
        "Pregunta!",
        "4"
      );
      camprodEdit([
        {
          modelo: "",
          nombre: "",
          precio: "",
          cantidad: "",
          marca: "",
          proveedor: "",
        },
      ]);
      cambiarModelo({ campo: "", valido: "" });
      cambiarNombre({ campo: "", valido: "" });
      cambiarPrecio({ campo: "", valido: "" });
      cambiarCantidad({ campo: "", valido: "" });
      cambiarMarca({ campo: "", valido: "" });
      cambiarProveedor({ campo: "", id: "" });
      camBotonControl(true);
    } else {
      MostrarAlerta1(
        "Favor de revisar que los datos esten correctos",
        "Error!",
        "2",
        () => {
          console.log("error");
        }
      );
    }
  };

  //Filtro por id para proveedores
  const filtrogeneralbyId = (cambiar, tab, id) => {
    cambiar(
      tab.filter(function (item) {
        return item.id.toString().toLowerCase().includes(id.toLowerCase());
      })
    );
  };

  const obtProvId = (id) => {
    camIndex(id);
    camBotonControl(false);
    filtrogeneralbyId(camprodEdit, tablaProducto, id);
    cambiarModelo({ campo: prodEdit[0].modelo, valido: "true" }); //
    cambiarNombre({ campo: prodEdit[0].nombre_producto, valido: "true" });
    cambiarPrecio({ campo: prodEdit[0].precio, valido: "true" }); //
    cambiarCantidad({ campo: prodEdit[0].existencia, valido: "true" });
    cambiarMarca({ campo: prodEdit[0].marca, valido: "true" }); //
    cambiarProveedor({ campo: prodEdit[0].proveedor, id: "true" });
  };

  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstPdts}</div>
        <CmpBotonMenu
          bolVisibilidad={true}
          funcion={Rutas[2]}
          cadicono="1"
          cadTipo="1"
          cadTexto={Cadenas.vstNt}
        />
        <CmpBotonMenu cadicono="2" cadTipo="2" cadTexto={Cadenas.vstPdts} />
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
              filtro={filtradoProductos}
            />
            <div className="tabla">
              <CmpTablas
                funcion={obtProvId}
                titulos={titulosTab}
                datos={busqueda.campo ? tablaFiltrada : tablaProducto}
                tipodatos="6"
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
              cadEtiqueta="Existencia:"
              cadPlaceholder="7"
              cadLeyenda="Solo se admiten numeros"
              bolObligatorio={true}
              cadNombre="Existencia"
              exprExpresionR={expresiones.cantidad}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={marca}
              estCambiarEstado={cambiarMarca}
              bolTipo={true}
              cadEtiqueta="Marca:"
              cadPlaceholder="Don Pancho"
              cadLeyenda="Solo se admiten letras"
              bolObligatorio={true}
              cadNombre="Marca"
              exprExpresionR={expresiones.marca}
            />

            <CmpCajaCombo
              funcion={() => console.log("")}
              tipoDatos="3"
              arrLista={tablaProveedor}
              cadEtiqueta="Proveedor:"
              cadNombre={"Proveedor"}
              estEstado={proveedor}
              estCambiarEstado={cambiarProveedor}
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={modelo}
              estCambiarEstado={cambiarModelo}
              bolTipo={true}
              cadEtiqueta="Modelo:"
              cadPlaceholder="Mueble"
              cadLeyenda="Solo se admiten letras y números"
              bolObligatorio={true}
              cadNombre="Modelo"
              exprExpresionR={expresiones.modelo}
            />
            <CmpBotonPrincipal
              bolVisibilidad={botonControl}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={() => guardarProducto()}
              cadTexto="Guardar"
              cadMensaje="¿Desea guardar los datos?"
            />
            <CmpBotonPrincipal
              bolVisibilidad={!botonControl}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={actualizarProducto}
              cadTexto="Actualizar"
              cadMensaje="¿Desea actualizar los datos?"
            />
            <CmpBotonPrincipal
              bolVisibilidad={!botonControl}
              cadTipofuncion="0"
              cadTipo="4"
              funcion={cancelEdicion}
              cadTexto="Cancelar"
              cadMensaje="¿Desea cancelar cambios?"
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstPdts;
