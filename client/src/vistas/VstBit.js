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
import CmpFecha from "../components/CmpFecha";

import firebase from "./../bd/conexion";

const VstBit = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [busqueda, cambiarBusqueda] = useState(new Date());
  const [tablaUsuarios, cambiarTablaUsuarios] = useState([]);
  const [tablaMovimiento, cambiarTablaMovimiento] = useState([]);
  const [tablaFiltrada, cambiarTablaFiltrada] = useState([]);
  //Variables Complementarias//Variables Complementarias

  const titulosTab = [
    { id: "Nombre empleado" },
    { id: "Movimiento" },
    { id: "Fecha de movimiento" },
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
    var length = history.length;
    history.go(-length);
    window.location.replace("/");
  };
  const irNotas = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/2");
  };
  const irProductos = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/3");
  };
  const irClientes = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/4");
  };
  const irEntregas = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/5");
  };
  const irProveedores = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/6");
  };
  const irBitacora = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/7");
  };
  const irRegistro = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/1");
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
        mensaje = "Se restablecio la sesion para: " + user.email;
        console.log(mensaje);
      } else {
        mensaje = "La sesion caduco";
        console.log(mensaje);
        setTimeout(() => {
          irInicio();
        }, 0);
      }
    });

    firebase.db.collection("movimiento").onSnapshot((querySnapshot) => {
      const movimientos = [];
      querySnapshot.forEach((doc) => {
        var movTemp = doc.data();
        var fechaConsulta = movTemp["fecha_movimiento"];
        var fechaActual = new Date().toDateString();
        var fechaComparar = fechaConsulta.toDate().toDateString() + "";
        var nombreCompleto = "";

        if (fechaActual === fechaComparar) {
          firebase.db.collection("usuario").onSnapshot((querySnapshot2) => {
            const usuarios = [];
            querySnapshot2.forEach((doc2) => {
              var usuarioTemp = doc2.data();
              if (doc2.id === movTemp["idcuenta"]) {
                nombreCompleto =
                  usuarioTemp["nombre_usuario"] +
                  " " +
                  usuarioTemp["apaterno"] +
                  " " +
                  usuarioTemp["amaterno"];
                movimientos.push({
                  nombre: nombreCompleto,
                  mov: movTemp["mov"],
                  fecha_movimiento: fechaComparar,
                });
              }
            });
            cambiarTablaUsuarios(usuarios);
          });
        }
      });
      cambiarTablaMovimiento(movimientos);
    });

    console.log("tablaUsuarios");
    console.log(tablaUsuarios);
    console.log("tablamovimientos");
    console.log(tablaMovimiento);
  }, []);

  // const filtradoMovimientoSelectorFecha = () => {
  //   cambiarTablaFiltrada(
  //     tablaMovimiento.filter(function (item) {
  //       return item.fecha_movimiento.toString().includes(busqueda);
  //     })
  //   );
  // };

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
          bolVisibilidad={true}
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

          {/* <CmpTextoBuscar
            estEstado={busqueda}
            estCambiarEstado={cambiarBusqueda}
            cadPlaceholder="Filtrar"
            cadNombre="busqueda"
            filtro={filtradoMovimientoSelectorFecha}
          /> */}

          {/* <CmpFecha
            estEstado={busqueda}
            estCambiarEstado={cambiarBusqueda}
            cadEtiqueta="Filtrar por fecha"
            cadNombre="busqueda"
            bolObligatorio={false}
            tipoFormato="2"
          /> */}

          <div className="tabla">
            <CmpTablas
              columnas={"3"}
              titulos={titulosTab}
              datos={tablaMovimiento}
              tipodatos="8"
            />
          </div>
        </ElmContNt>
      </div>
    </ElmVstNt>
  );
};
export default VstBit;
