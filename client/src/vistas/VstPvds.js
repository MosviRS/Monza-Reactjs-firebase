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
import { actualizar, funcion } from "./../bd/servicios";
//Importacion Componentes
import firebase from "../bd/conexion";
import { guardarProveedores } from "../bd/servicios";
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpBotonMenu from "../components/CmpBotonMenu";
import CmpTextoBuscar from "../components/CmpTextoBuscar";
import CmpTablas from "../components/CmpTablas";
import {
  MostrarAlerta1,
  MostrarAlerta2,
  MostrarAlerta3,
} from "../components/CmpAlertas";

const VstPvds = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado

  const [btnControl, definirbtnControl] = useState(null);

  const [index, camIndex] = useState("");
  const [provEdit, camprovEdit] = useState([
    { nombre_empresa: "", direccion: "", telefono: "", correo: "" },
  ]);
  const [botonControl, camBotonControl] = useState(true);
  const [tablaProveedor, cambiarTablaProveedor] = useState([]);
  const [tablaFiltrada, cambiarTablaFiltrada] = useState([]);
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: "" });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: "" });
  const [direccion, cambiarDireccion] = useState({ campo: "", valido: "" });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: "" });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: "" });
  //Variables Complementarias//Variables Complementarias
  // /(.+?)(?:(?:first)|(?:second)|(?:third)|(?:fourth)|$)/gim, //Expresion regular para buscar en un string
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /(.+?)(?:(?:first)|(?:second)|(?:third)|(?:fourth)|$)/gim, // Letras, numeros, guion, guion_bajo, punto, mas y menos, espacios
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono:
      /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/, // 7 a 14 numeros.
  };

  const titulosTab = [
    { id: "Nombre" },
    { id: "Direccion / Domicilio" },
    { id: "Telefono" },
    { id: "Correo" },
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

  //Porceso detras de la renderizacion de React
  useEffect(() => {

    var mensaje = "";
    //Verificacion de la sesion
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        const email = user.email

        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);
        //Verificacion del tipo de usuario - bloqueo componentes
        firebase.db.collection("usuario").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((user) => {
            const usuarioObtenido = user.data()
            if(email === usuarioObtenido['correo']){
              if(usuarioObtenido['tipo_usuario'] === 'Gerente'){
                definirbtnControl(false)     
              } else if(usuarioObtenido['tipo_usuario'] === 'Vendedor'){
                irNotas();
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

    //Consulta de tabla proveedores
    firebase.db.collection("proveedor").onSnapshot((querySnapshot) => {
      const documentos = [];
      querySnapshot.forEach((doc) => {
        documentos.push({ ...doc.data(), id: doc.id });
      });
      cambiarTablaProveedor(documentos);
    });
    
  }, []);

  //Cerrar sesion
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

  //Filtro de proveedores
  const filtradoProvedores = () => {
    cambiarTablaFiltrada(
      tablaProveedor.filter(function (item) {
        return item.nombre_empresa
          .toString()
          .toLowerCase()
          .includes(busqueda.campo.toLowerCase());
      })
    );
  };

  //limpiar campos del proveedor
  const cancelEdicion = () => {
    camprovEdit([
      { nombre_empresa: "", direccion: "", telefono: "", correo: "" },
    ]);
    cambiarNombre({ campo: "", valido: "" });
    cambiarDireccion({ campo: "", valido: "" });
    cambiarTelefono({ campo: "", valido: "" });
    cambiarCorreo({ campo: "", valido: "" });
    camBotonControl(true);
  };

  //Guardar proveedor
  const guardarProveedor = () => {
    if (
      nombre.campo !== "" &&
      direccion.campo !== "" &&
      telefono.campo !== "" &&
      correo.campo !== "" &&
      nombre.valido === "true" &&
      direccion.valido === "true" &&
      telefono.valido === "true" &&
      correo.valido === "true"
    ) {
      MostrarAlerta2(
        () =>
          MostrarAlerta3("Datos Guardados Correctamente", () => {
            guardarProveedores(
              correo.campo,
              direccion.campo,
              nombre.campo,
              telefono.campo
            );
          }),
        "¿Desaea Guardar datos?",
        "Pregunta!",
        "4"
      );

      camprovEdit([
        { nombre_empresa: "", direccion: "", telefono: "", correo: "" },
      ]);
      cambiarNombre({ campo: "", valido: "" });
      cambiarDireccion({ campo: "", valido: "" });
      cambiarTelefono({ campo: "", valido: "" });
      cambiarCorreo({ campo: "", valido: "" });
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

  //Actualizar proveedor
  const actualizarProveedor = () => {
    if (
      nombre.campo !== "" &&
      direccion.campo !== "" &&
      telefono.campo !== "" &&
      correo.campo !== "" &&
      nombre.valido === "true" &&
      direccion.valido === "true" &&
      telefono.valido === "true" &&
      correo.valido === "true"
    ) {
      MostrarAlerta2(
        () =>
          MostrarAlerta3("Datos Actualizados Correctamente", () => {
            actualizar("proveedor", index, {
              correo: correo.campo,
              direccion: direccion.campo,
              nombre_empresa: nombre.campo,
              telefono: telefono.campo,
            });
          }),
        "¿Desaea Actualizar datos?",
        "Pregunta!",
        "4"
      );
      camprovEdit([
        { nombre_empresa: "", direccion: "", telefono: "", correo: "" },
      ]);
      cambiarNombre({ campo: "", valido: "" });
      cambiarDireccion({ campo: "", valido: "" });
      cambiarTelefono({ campo: "", valido: "" });
      cambiarCorreo({ campo: "", valido: "" });
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
    filtrogeneralbyId(camprovEdit, tablaProveedor, id);
    cambiarNombre({ campo: provEdit[0].nombre_empresa, valido: "true" });
    cambiarDireccion({ campo: provEdit[0].direccion, valido: "true" });
    cambiarTelefono({ campo: provEdit[0].telefono, valido: "true" });
    cambiarCorreo({ campo: provEdit[0].correo, valido: "true" });
  };
  console.log(provEdit);

  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstPvds}</div>
        <CmpBotonMenu
        bolVisibilidad={true}
          funcion={Rutas[2]}
          cadicono="1"
          cadTipo="1"
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
        cadicono="5" 
        cadTipo="2" 
        cadTexto={Cadenas.vstPvds} />
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
            <div className="titulo">Lista de proveedores</div>

            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Filtrar proveedores"
              cadNombre="busqueda"
              filtro={filtradoProvedores}
            />
            <div className="tabla">
              <CmpTablas
                funcion={obtProvId}
                columnas="4"
                titulos={titulosTab}
                datos={busqueda.campo == "" ? tablaProveedor : tablaFiltrada}
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
              cadLeyenda="De 1 a 40 Letras y espacios, pueden llevar acentos."
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
              cadLeyenda="De 1 a 200 Letras, numeros, guion, guion_bajo, punto, mas y menos, espacios ."
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
              cadLeyenda="7 a 14 numeros (Se admiten varios formatos de telefonia)."
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
              cadLeyenda="solo formato de correos"
              bolObligatorio={true}
              cadNombre={"Correo"}
              exprExpresionR={expresiones.correo}
            />

            <CmpBotonPrincipal
              bolVisibilidad={botonControl}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={guardarProveedor}
              cadTexto="Guardar"
              cadMensaje="¿Desea guardar los datos?"
            />
            <CmpBotonPrincipal
              bolVisibilidad={!botonControl}
              cadTipofuncion="0"
              cadTipo="3"
              funcion={actualizarProveedor}
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
export default VstPvds;
