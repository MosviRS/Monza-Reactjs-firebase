/*
SlimeDev
VstEtgs - Vista
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
import CmpRevisionCaja from "../components/CmpRevisionCaja";

import firebase from "./../bd/conexion";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

const VstEtgs = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  
  const [btnControl, definirbtnControl] = useState(null);

  const [datosEntregas,cambiarEntregas]= useState([]);
  const [tablaFiltrada, cambiarTablaFiltrada] = useState([]);
  const [datosVentas,cambiarVentas]= useState([]);
  const [datosClientes,cambiarClientes]= useState([]);
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "Laura", valido: null });
  const [nota, cambiarNota] = useState({ campo: "12360", valido: null });
  const [estadoEntrega, cambiarEstadoEntrega] = useState({
    campo: "12360",
    valido: null,
  });
  //Variables Complementarias

  const titulosTab = [    
    { id: "Nombre" },
    { id: "Direccion" },
    { id: "Referencia" },
    { id: "Fecha de entrega" },
    { id: "Hora de entrega" },
    { id: "Telefono" },
    { id: "Estado" },
  ];
  const data = [
    {
      id: "1",
      a: "name",
      b: "Apellido",
      c: "Edad",
      d: "Email",
      e: "Email",
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

    var mensaje = "";
    //Verifica sesion del usuario
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        const email = user.email

        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);
        //verifica tipo de usuario
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
    //Consulta la tabla Entregas
    firebase.db.collection("entrega").onSnapshot((querySnapshot) => {
      const entregas = [];
      querySnapshot.forEach((doc) => {        
        var entregaTemp= doc.data();
        var fechaEntrega= entregaTemp['fecha_ent'];
        var horaEntrega= entregaTemp['hora_ent'];
        var referencia= entregaTemp['referencia'];        
        var estado= entregaTemp['estado'];
        //Consulta la tabla ventas
        firebase.db.collection("venta").onSnapshot((querySnapshot) => {
          const ventas = [];
          querySnapshot.forEach((doc) => {
            var ventaTemp = doc.data()
            if(doc.id === entregaTemp['idventa']){
              var idventa=entregaTemp['idventa'];
              var idAsociado=ventaTemp['idcliente'];
              //Consulta la tabla clientes
              firebase.db.collection("cliente").onSnapshot((querySnapshot) => {
                const cliente = [];
                querySnapshot.forEach((doc) => {
                  var clienteTemp = doc.data();
                  if(doc.id === idAsociado){
                    var nombreCompleto = clienteTemp['nombre_cliente'] + ' ' +
                    clienteTemp['apaterno'] + ' ' + clienteTemp['amaterno'];
                    var direccion=  clienteTemp['direccion'];
                    var telefono= clienteTemp['telefono'];
                    entregas.push({ nombre: nombreCompleto, direccion: direccion, referencia:referencia, fecha_ent:fechaEntrega, hora_ent: horaEntrega, telefono:telefono, estado: estado });
                  }
                });
              cambiarClientes(cliente)  
              });                            
            }
          });        
          cambiarVentas(ventas);
        });      
      });
      cambiarEntregas(entregas);        
    });      
  },[]);
  
  console.log('Tabla Entregas');
  console.log(datosEntregas);

  //Cerrar la sesion 
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
  }
    
  const filtradoEntregas = () => {
    cambiarTablaFiltrada(
      datosEntregas.filter(function (item) {
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
        <div className="titulo">{Cadenas.vstEtgs}</div>
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
          cadTexto="Abonos"
        />
        <CmpBotonMenu 
        bolVisibilidad={true}
        cadicono="4" 
        cadTipo="2" 
        cadTexto="Entregas" />
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
            <div className="titulo">Lista de entregas</div>

            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Filtrar entregas"
              cadNombre="busqueda"
              filtro={filtradoEntregas}
            />
            <div className="tabla">
              <CmpTablas
                columnas="7"
                titulos={titulosTab}
                datos={busqueda.campo=== "" ? datosEntregas: tablaFiltrada}
                tipodatos="9"
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Estado de entrega</div>
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
            <CmpRevisionCaja
              tipo="2"
              estEstado={estadoEntrega}
              estCambiarEstado={cambiarEstadoEntrega}
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstEtgs;
