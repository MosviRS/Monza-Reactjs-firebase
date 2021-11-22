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
import {guardarAbonos}from "../bd/servicios";
import { ActualizarVenta } from "../bd/servicios";
import {MostrarAlerta1}from "../components/CmpAlertas";

const VstAbns = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [index, camIndex] = useState("");
  const [abonosEdit, camAbonosEdit] = useState([
    {
      id:"",
      idventa: "",      
      nombre:"",      
      direccion:"",      
      fecha_venta:"",      
      total:"",      
      cant_abonada:"",      
      adeudo:"", 
      idabono:"",     
    },
  ]);

  const [datosAbonos, cambiarTablaAbonos]= useState([]);
  const [tablaFiltrada, cambiarTablaFiltrada] = useState([]);
  const [fechaAbn, setFechaAbn] = useState(new Date());
  const [btnControl, definirbtnControl] = useState(null);
  const [datosVentas, cambiarVentas] = useState([]);
  const [datosClientes, cambiarClientes] = useState([]);
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "Laura", valido: null });
  const [nota, cambiarNota] = useState({ campo: "12360", valido: null });
  const [abono, cambiarAbono] = useState({ campo: "", valido: null });
  const [usuario, setDataUsuario] = useState({ campo: "", id: "" });
  const [pago, cambiarPago] = useState({ campo: "Abono" });
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
    var mensaje = "";
    //verifica la sesion del usuiario
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        const email = user.email;

        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);
        //verifica el tipo de usuario
        firebase.db.collection("usuario").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((user2) => {
            const usuarioObtenido = user2.data();
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
    //Consulta la tabla venta
    firebase.db.collection("venta").onSnapshot((querySnapshot) => {
      const ventas = [];
      querySnapshot.forEach((doc) => {        
        var ventaTemp = doc.data()
        var idventa=doc.id;
        var idAsociado=ventaTemp['idcliente'];
        var fech=ventaTemp['fecha_venta'];
        var fecha_venta=fech.toDate().toDateString() + "";
        var total=ventaTemp['total'];                
        //Consulta la tabla clientes
        firebase.db.collection("cliente").onSnapshot((querySnapshot) => {
          const clientes = [];
          querySnapshot.forEach((doc) => {
            var clienteTemp = doc.data();
            if (doc.id === idAsociado) {
              var nombreCompleto =
                clienteTemp["nombre_cliente"] +
                " " +
                clienteTemp["apaterno"] +
                " " +
                clienteTemp["amaterno"];
              var direccion = clienteTemp["direccion"];
              //Consulta la tabla abonos
              firebase.db.collection("abono").onSnapshot((querySnapshot) => {                
                const abonos = [];                
                querySnapshot.forEach((doc) => {                  
                  var abonoTemp = doc.data();                  
                    if(idventa === abonoTemp['idventa']){
                      var idabono=doc.id;
                      var fecha_abono=abonoTemp['fecha_abono'];                                                                                  
                      var cant_abonada=abonoTemp['cant_abonada'];  //((cant_abonada) + parseFloat(abonoTemp['cant_abonada']));                                                            
                      var adeudo=  (parseFloat(total)-parseFloat(cant_abonada));   
                      
                      if(adeudo===0){
                        ActualizarVenta("pagado",idventa);
                      }
                      
                      console.log("Adeudo",adeudo);
                    abonos.push({
                      id:idventa,
                      idventa:idventa, 
                      nombre:nombreCompleto, 
                      direccion:direccion,
                      fecha_venta:fecha_venta,                      
                      total:total,
                      cant_abonada:cant_abonada,
                      adeudo:adeudo,
                      idabono,
                    });
                  }
                });                
              cambiarTablaAbonos(abonos);
              });                            
            }
          });
          cambiarClientes(clientes);
        });
      });
      cambiarVentas(ventas);
    });
  }, []);

  console.log("Tabla Abonos");
  console.log(datosAbonos);

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
  
  const filtradoClientes = () => {
    cambiarTablaFiltrada(
      datosAbonos.filter(function (item) {
        return item.nombre
          .toString()
          .toLowerCase()
          .includes(busqueda.campo.toLowerCase());
      })
    );
  };

  const filtrogeneralbyId = (cambiar, tab, id) => {
    cambiar(
      tab.filter(function (item) {
        return item.id.toString().toLowerCase().includes(id.toLowerCase());
      })
    );
  };

  const actualizarAbonos=()=>{    
    var cantidad=(parseFloat(abono.campo)+ parseFloat(abonosEdit[0].cant_abonada));
    console.log(cantidad);
      if(parseFloat(abonosEdit[0].adeudo)>=parseFloat(abono.campo)){    
        guardarAbonos(fechaAbn,cantidad ,nota.campo,abonosEdit[0].idabono);                
        guardarMovimientos(fechaAbn,usuario,pago);                
        camAbonosEdit([
          {
            id:"",
            idventa: "",      
            nombre:"",      
            direccion:"",      
            fecha_venta:"",      
            total:"",      
            cant_abonada:"",      
            adeudo:"", 
            idabono:"",     
          },
        ]);
        cambiarNombre({ campo:"", valido: null });
        cambiarNota({ campo:"", valido: null }); 
        cambiarAbono({campo:"",valido:null});      
      }else{
        
        if(parseFloat(abonosEdit[0].adeudo)!=0){     
          MostrarAlerta1("Esta venta ya esta Saldada", "No es posible",2,()=>{});            
        }else{
          MostrarAlerta1("Verifica la cantidad ingresada", "Error",2,()=>{});
        }
              
        camAbonosEdit([
          {
            id:"",
            idventa: "",      
            nombre:"",      
            direccion:"",      
            fecha_venta:"",      
            total:"",      
            cant_abonada:"",      
            adeudo:"", 
            idabono:"",     
          },
        ]);
        cambiarNombre({ campo:"", valido: null });
        cambiarNota({ campo:"", valido: null }); 
        cambiarAbono({campo:"",valido:null});
      }      
  };


  const obtAbns = (id) => {
    camIndex(id);
    filtrogeneralbyId(camAbonosEdit, datosAbonos, id);
    cambiarNombre({ campo: abonosEdit[0].nombre, valido: "true" });
    cambiarNota({ campo: abonosEdit[0].idventa, valido: "true" });   
           
  };

  console.log(abonosEdit[0].idabono);
  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">{Cadenas.vstAbns}</div>
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
        <CmpBotonMenu cadicono="3" cadTipo="2" cadTexto={Cadenas.vstAbns} />
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
            <div className="titulo">Lista de clientes</div>

            <CmpTextoBuscar
              estEstado={busqueda}
              estCambiarEstado={cambiarBusqueda}
              cadPlaceholder="Filtrar clientes"
              cadNombre="busqueda"
              filtro={filtradoClientes}
            />
            <div className="tabla">
              <CmpTablas
                funcion={obtAbns}
                columnas="7"
                titulos={titulosTab}
                datos={busqueda.campo == "" ? datosAbonos : tablaFiltrada}
                tipodatos="10"
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
                actualizarAbonos()                
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
