/*
SlimeDev
VstPvds - Vista
Fecha de creación: 10/11/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      David Velazquez Ramirez,
      Diego Cruz Barajas
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
import { funcion } from "./../bd/servicios";
//Importacion Componentes
import firebase from "../bd/conexion";
import { guardarProveedores } from "../bd/servicios";
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTablas from "../components/CmpTablas";

const VstPvds = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [tablaProveedor, cambiarTablaProveedor] = useState([]);
  const [tablaFiltrada, cambiarTablaFiltrada] = useState([]);
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [direccion, cambiarDireccion] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [mercancia, cambiarMercancia] = useState({ campo: "", valido: null });
  //Variables Complementarias//Variables Complementarias
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono:
      /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/, // 7 a 14 numeros.
  };

  const titulosTab = [
    { id: "Nombre" },
    { id: "Apellidos" },
    { id: "Direccion / Domicilio" },
    { id: "Telefono" },
    { id: "Correo" },
  ];
  const data = [
    {
      id: "1",
      a: "name",
      b: "Apellido",
      c: "Edad",
      d: "Email",
      e: "Telefono",
    },
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
    const ac = new AbortController();

    var mensaje = "";

    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        ac.abort();
        mensaje = "Se restablecio la sesion para: " + user.email;
        console.log(mensaje);
      } else {
        mensaje = "La sesion caduco";
        console.log(mensaje);
        ac.abort();
        setTimeout(() => {
          irInicio();
        }, 0);
      }
    });

    return () => ac.abort();
  });

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

  useEffect(() => {
    firebase.db.collection("proveedor").onSnapshot((querySnapshot) => {
      const documentos = [];
      querySnapshot.forEach((doc) => {
        documentos.push({ ...doc.data(), id: doc.id });
      });
      cambiarTablaProveedor(documentos);
    });
  }, []);

  const filtradoProvedores = () => {
    cambiarTablaFiltrada(
      tablaProveedor.filter(function (item) {
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
        <div className="titulo">{Cadenas.vstPvds}</div>
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
        <CmpBotonMenu cadicono="5" cadTipo="2" cadTexto={Cadenas.vstPvds} />
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
            <div className="titulo">Lista de proveedores</div>

            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Filtrar proveedores"
              cadNombre="busqueda"
            />
            <div className="tabla">
              <CmpTablas
                columnas="4"
                titulos={titulosTab}
                datos={tablaProveedor || tablaFiltrada}
                tipodatos="5"
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Registro/Actualización de Proveedores</div>
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={nombre}
              estCambiarEstado={cambiarNombre}
              bolTipo={true}
              cadEtiqueta="Nombre(s) del proveedor:"
              cadPlaceholder="Laura"
              cadLeyenda="Nombre del proveedor"
              bolObligatorio={true}
              cadNombre="nombre"
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
              exprExpresionR={expresiones.nombre}
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
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={mercancia}
              estCambiarEstado={cambiarMercancia}
              bolTipo={true}
              cadEtiqueta="Mercancia"
              cadPlaceholder="Muebles de Otoño"
              cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
              bolObligatorio={true}
              cadNombre={"mercancia"}
              exprExpresionR={expresiones.nombre}
            />

            <CmpBotonPrincipal
              cadTipofuncion="6"
              cadTipo="3"
              funcion={() =>
                guardarProveedores(
                  correo.campo,
                  direccion.campo,
                  nombre.campo,
                  telefono.campo
                )
              }
              cadTexto="Guardar"
              cadMensaje="¿Desea guardar o actualizar los datos?"
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstPvds;
