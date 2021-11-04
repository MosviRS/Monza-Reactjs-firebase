/*
SlimeDev
CmpTablas - Componente
Fecha de creación: 26/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import {
  ELmContenedorTabla,
  ELmContenedorTablaCont,
} from "./../Elementos/Elementos";
const CmpTablas = () => {
  const title = [
    { id: "Title1" },
    { id: "Title2" },
    { id: "Title3" },
    { id: "Title4" },
  ];
  const data = [
    { id: "1", nombre: "name", apellido: "Apellido", edad: "Edad" },
    { id: "2", nombre: "name", apellido: "Apellido", edad: "Edad" },
    { id: "3", nombre: "name", apellido: "Apellido", edad: "Edad" },
  ];
  return (
    <div>
      <ELmContenedorTabla fraccion={"4"}>
        {title.map((value) => {
          return <div>{value.id}</div>;
        })}
      </ELmContenedorTabla>
      {data.map((value) => {
        return (
          <ELmContenedorTablaCont fraccion="4">
            <div>{value.id}</div>
            <div>{value.nombre}</div>
            <div>{value.apellido}</div>
            <div>{value.edad}</div>
          </ELmContenedorTablaCont>
        );
      })}
    </div>
  );
};
export default CmpTablas;
