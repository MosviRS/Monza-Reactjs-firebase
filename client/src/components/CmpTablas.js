/*
SlimeDev
CmpTablas - Componente
Fecha de creación: 26/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-8/11/2021  Pruebas
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ELmContenedorTabla,
  ELmContenedorTablaCont,
} from "./../Elementos/Elementos";
const CmpTablas = ({ titulos, datos, tipodatos, columnas }) => {
  const data1 = (value) => {
    return (
      <ELmContenedorTablaCont key={value.id} fraccion={columnas | "5"}>
        <div>{value.id}</div>
        <div>{value.nombre}</div>
        <div>{value.apellido}</div>
        <div>{value.edad}</div>
        <div>{value.email}</div>
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

  const funcionprincipal = (value) => {
    const selectDatos = {
      1: data1(value),
      2: data2(value),
      3: data3(value),
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
