/*
SlimeDev
VstAbns - Vista
Fecha de creación: 10/11/2021 - Responsable: Carlos López Palma, Diego Cruz Barajas
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
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
import {guardarMovimientos} from "../bd/servicios";

const VstAbns = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [fechaAbn, setFechaAbn] = useState(new Date());
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "Laura", valido: null });
  const [nota, cambiarNota] = useState({ campo: "12360", valido: null });
  const [abono, cambiarAbono] = useState({ campo: "", valido: null });
  const [usuario,setDataUsuario]=useState({campo:"",id:""});
  const [pago,cambiarPago]=useState({campo:"Abono"});
  //Variables Complementarias

  const titulosTab = [
    { id: "Id (Venta)" },
    { id: "Nombre" },
    { id: "Direccion / Domicilio" },
    { id: "Fecha de compra" },
    { id: "Total a pagar" },
    { id: "Abonado" },
    { id: "Adeudo" },
  ];
  const data = [
    {
      id: "1",
      a: "name",
      b: "Apellido",
      c: "Edad",
      d: "Email",
      e: "Email",
      f: "Email",
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
        setDataUsuario({campo:user.email,id:user.uid});
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

  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstAbns}</div>
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
        <CmpBotonMenu cadicono="3" cadTipo="2" cadTexto={Cadenas.vstAbns} />
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
            <div className="titulo">Lista de clientes</div>

            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Filtrar clientes"
              cadNombre="busqueda"
            />
            <div className="tabla">
              <CmpTablas
                columnas="7"
                titulos={titulosTab}
                datos={data}
                tipodatos="3"
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Abono del Cliente</div>
            <CmpTextoForm
              cadTipoprincipal="3"
              estEstado={nombre}
              estCambiarEstado={cambiarNombre}
              bolTipo={true}
              cadEtiqueta="Nombre(s):"
              cadPlaceholder="Laura"
              cadLeyenda="Nombre del cliente"
              bolObligatorio={false}
              cadNombre="nombre"
            />
            <CmpTextoForm
              cadTipoprincipal="3"
              estEstado={nota}
              estCambiarEstado={cambiarNota}
              bolTipo={true}
              cadEtiqueta="Nota:"
              cadPlaceholder="12385"
              cadLeyenda="Nota"
              bolObligatorio={true}
              cadNombre="Nota"
            />
            <CmpTextoForm
              cadTipoprincipal="1"
              estEstado={abono}
              estCambiarEstado={cambiarAbono}
              bolTipo={true}
              cadEtiqueta="Abono Recibido"
              cadPlaceholder="$ 0000.00"
              cadLeyenda="Inserte abono"
              bolObligatorio={true}
              cadNombre="abono"
            />
            <CmpBotonPrincipal
              bolVisibilidad={true}
              cadTipofuncion="6"
              cadTipo="3"
              funcion={() => 
                guardarMovimientos(fechaAbn,usuario,pago)
              }
              cadTexto="Abonar"
              cadMensaje="¿Todos los datos son correcto en la venta?"
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstAbns;
