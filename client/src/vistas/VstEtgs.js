/*
SlimeDev
VstEtgs - Vista
Fecha de creación: 10/11/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: 
    Elementos.js, 
    CmpBotonPrincipal.js, 
    CmpTextoForm.js, 
    CmpBotonMenu.js, 
    CmpTextoBuscar.js,
    CmpTablas.js,
*/
import React, { useState } from "react";
//importacion de Elementos graficos
import {
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
const VstEtgs = () => {
  //Estilo del Fondo
  document.body.style = "background:" + Colores.ColNegroProgreso + ";";

  //Variables estado
  const [busqueda, cambiarBusqueda] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "Laura", valido: null });
  const [nota, cambiarNota] = useState({ campo: "12360", valido: null });
  //Variables Complementarias

  const titulosTab = [
    { id: "ID (Nota)" },
    { id: "Nombre" },
    { id: "Direccion" },
    { id: "Referencia" },
    { id: "Fecha de entrega" },
    { id: "Telefono" },
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
  //rederizacion
  return (
    <ElmVstNt>
      <div className="contenedor1">
        <div className="titulo">Entregas</div>
        <CmpBotonMenu
          funcion={Rutas[2]}
          cadicono="1"
          cadTipo="1"
          cadTexto="Notas"
        />
        <CmpBotonMenu
          funcion={Rutas[3]}
          cadicono="2"
          cadTipo="1"
          cadTexto="Productos"
        />
        <CmpBotonMenu
          funcion={Rutas[4]}
          cadicono="3"
          cadTipo="1"
          cadTexto="Abonos"
        />
        <CmpBotonMenu cadicono="4" cadTipo="2" cadTexto="Entregas" />
        <CmpBotonMenu
          funcion={Rutas[6]}
          cadicono="5"
          cadTipo="1"
          cadTexto="Proveedores"
        />
        <CmpBotonMenu
          funcion={Rutas[7]}
          cadicono="6"
          cadTipo="1"
          cadTexto="Bitacora"
        />
        <CmpBotonMenu
          funcion={Rutas[8]}
          cadicono="8"
          cadTipo="1"
          cadTexto="Registro de personal"
        />
        <CmpBotonPrincipal
          cadTipofuncion="6"
          funcion={Rutas[1]}
          cadTipo="4"
          cadTexto="Cerrar Sesión"
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
            />
            <div className="tabla">
              <CmpTablas
                columnas="6"
                titulos={titulosTab}
                datos={data}
                tipodatos="2"
              />
            </div>
          </ElmContNt>
        </div>
        <div className="subCont2">
          <ElmFormNt>
            <div className="titulo">Exportar a PDF</div>
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
            <CmpBotonMenu
              cadicono="7"
              cadTipo="3"
              funcion={() => console.log("click")}
              cadTexto="Exportar a PDF"
            />
          </ElmFormNt>
        </div>
      </div>
    </ElmVstNt>
  );
};
export default VstEtgs;
