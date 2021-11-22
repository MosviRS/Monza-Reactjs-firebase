/*
SlimeDev
CmpTablas - Componente
Fecha de creación: 26/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-8/11/2021  Pruebas
-19/11/2021  Se agrega botones pendiente personalizar tablas para las vistas
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ELmContenedorTabla,
  ELmContenedorTablaCont,
} from "./../Elementos/Elementos";
import CmpBotonPrincipal from "./CmpBotonPrincipal";
const CmpTablas = ({
  titulos,
  datos,
  tipodatos,
  columnas,
  cambiarDatos,
  total,
  camTotal,
  funcion,
}) => {
  const data1 = (value) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas}>
        <div>{value.id}</div>
        <div>{value.nombre}</div>
        <div>{value.apellido}</div>
        <div>{value.edad}</div>
        <div>{value.email}</div>
        <CmpBotonPrincipal
          cadTipofuncion="0"
          funcion={() => {
            console.log("hola");
          }}
          cadTipo="4"
          cadTexto="X"
          cadMensaje="hola"
        />
      </ELmContenedorTablaCont>
    );
  };
  const data2 = (value) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas}>
        <div>{value.id}</div>
        <div>{value.a}</div>
        <div>{value.b}</div>
        <div>{value.c}</div>
        <div>{value.d}</div>
        <div>{value.e}</div>
        <CmpBotonPrincipal
          cadTipofuncion="0"
          funcion={() => {
            console.log("hola");
          }}
          cadTipo="4"
          cadTexto="X"
          cadMensaje="hola"
        />
      </ELmContenedorTablaCont>
    );
  };
  const data3 = (value) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas}>
        <div>{value.id}</div>
        <div>{value.a}</div>
        <div>{value.b}</div>
        <div>{value.c}</div>
        <div>{value.d}</div>
        <div>{value.e}</div>
        <div>{value.f}</div>
      </ELmContenedorTablaCont>
    );
  };
  const data4 = (value) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas}>
        <div>{value.id}</div>
        <div>{value.a}</div>
        <div>{value.b}</div>
        <div>{value.c}</div>
      </ELmContenedorTablaCont>
    );
  };
  const tabla1 = (value) => {
    return (
      <ELmContenedorTablaCont key={value.idprod} fraccion={columnas}>
        <div>{value.modelo}</div>
        <div>{value.nombre_producto}</div>
        <div>{value.precio}</div>
        <div>{value.c}</div>
        <div>{value.d}</div>
        <div>{value.e}</div>
        <div>{value.f}</div>
      </ELmContenedorTablaCont>
    );
  };

  const tabNotas = (value, indice) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas}>
        <div>{value.modelo}</div>
        <div>{value.nombre_producto}</div>
        <div>{value.precio}</div>
        <div>{value.cantidad}</div>
        <div>{value.sub_total}</div>
        <CmpBotonPrincipal
          bolVisibilidad={true}
          cadTipofuncion="8"
          funcion={() => eliminar(value, datos.indexOf(value))}
          cadTipo="4"
          cadTexto="X"
          cadMensaje="Eliminado"
        />
      </ELmContenedorTablaCont>
    );
  };
  const tabProductos = (value) => {
    return (
      <ELmContenedorTablaCont 
          onClick={() => funcion(value.id)}
          key={value.id} 
          fraccion={columnas}
        >
        <div>{value.modelo}</div>
        <div>{value.nombre_producto}</div>
        <div>{value.precio}</div>
        <div>{value.existencia}</div>
        <div>{value.marca}</div>
        <div>{value.proveedor}</div>
      </ELmContenedorTablaCont>
    );
  };

  const tabProveedores = (value) => {
    return (
      <ELmContenedorTablaCont
        onClick={() => funcion(value.id)}
        key={value.id}
        fraccion={columnas}
      >
        <div>{value.nombre_empresa}</div>
        <div>{value.direccion}</div>
        <div>{value.telefono}</div>
        <div>{value.correo}</div>
      </ELmContenedorTablaCont>
    );
  };

  const tabBitacora = (value) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas}>
        <div>{value.nombre}</div>
        <div>{value.mov}</div>
        <div>{value.fecha_movimiento}</div>
      </ELmContenedorTablaCont>
    );
  };
  const tabEntregas= (value) => {
    return (
      <ELmContenedorTablaCont
        onClick={() => funcion(value.id)}
        key={value.id}
        fraccion={columnas}
      >
        <div>{value.nombre}</div>
        <div>{value.direccion}</div>
        <div>{value.referencia}</div>
        <div>{value.fecha_ent}</div>
        <div>{value.hora_ent}</div>
        <div>{value.telefono}</div>
        <div>{value.estado}</div>
      </ELmContenedorTablaCont>
    );
  };
  const tabAbonos= (value) => {
    return (
      <ELmContenedorTablaCont
        onClick={() => funcion(value.id)}
        key={value.id}
        fraccion={columnas}
      >        
        <div>{value.nombre}</div>
        <div>{value.direccion}</div>
        <div>{value.fecha_venta}</div>                
        <div>{value.total}</div>        
        <div>{value.cant_abonada}</div>        
        <div>{value.adeudo}</div>
      </ELmContenedorTablaCont>
    );
  };

  const eliminar = (value, index) => {
    // console.log(index);
    datos.splice(index, 1);
    cambiarDatos(datos);
    camTotal({ campo: total.campo - value.precio * value.cantidad });
  };
  const funcionprincipal = (value) => {
    const selectDatos = {
      1: data1(value),
      2: data2(value),
      3: data3(value),
      4: data4(value),
      5: tabProveedores(value),
      6: tabProductos(value),
      7: tabNotas(value),
      8: tabBitacora(value),
      9: tabEntregas(value),
      10:tabAbonos(value),
    };
    return selectDatos[tipodatos];
  };

  return (
    <div>
      <ELmContenedorTabla fraccion={columnas}>
        {titulos.map((value) => {
          return <div key={value.id}>{value.id}</div>;
        })}
      </ELmContenedorTabla>
      {datos.map((value) => {
        return <div>{funcionprincipal(value)}</div>;
      })}
    </div>
  );
};
export default CmpTablas;
