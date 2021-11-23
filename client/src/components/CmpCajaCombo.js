/*
SlimeDev
CmpCajaCombo - Componente
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados: Elementos.js, 
*/
import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  ElmSeleccionGbl,
  ElmGrupoTextoIns,
  ElmIconoComboCaja,
  ElmEtiquetaGbl,
} from "../Elementos/Elementos";
const CompSeleccion = ({
  arrLista,
  cadEtiqueta,
  cadNombre,
  estEstado,
  estCambiarEstado,
  tipoDatos,
  funcion,
}) => {
  const onChange = (e) => {
    estCambiarEstado({ ...estEstado, campo: e.target.value });

    funcion();
  };
  const onClick = (value) => {
    estCambiarEstado({ ...estEstado, id: value });
    funcion();
  };
  const datos1 = () => {
    return (
      <div>
        <ElmEtiquetaGbl htmlFor={cadNombre}>{cadEtiqueta}</ElmEtiquetaGbl>
        <ElmGrupoTextoIns>
          <ElmSeleccionGbl name={cadNombre} onChange={onChange}>
            {arrLista.map((value) => {
              return (
                <option key={value.id} value={value.nombre}>
                  {value.nombre}
                </option>
              );
            })}
          </ElmSeleccionGbl>
          <ElmIconoComboCaja icon={faChevronDown} />
        </ElmGrupoTextoIns>
      </div>
    );
  };
  const datos2 = () => {
    return (
      <div>
        <ElmEtiquetaGbl htmlFor={cadNombre}>{cadEtiqueta}</ElmEtiquetaGbl>
        <ElmGrupoTextoIns>
          <ElmSeleccionGbl name={cadNombre} onChange={onChange}>
            {arrLista.map((value) => {
              return (
                <option
                  key={value.id}
                  onClick={() => onClick(value.id)}
                  value={value.nombre_producto}
                >
                  {value.nombre_producto}
                  {}
                </option>
              );
            })}
            {/* <option value={""}>Selecciona un Elemento</option> */}
          </ElmSeleccionGbl>
          <ElmIconoComboCaja icon={faChevronDown} />
        </ElmGrupoTextoIns>
      </div>
    );
  };

  const datos3 = () => {
    return (
      <div>
        <ElmEtiquetaGbl htmlFor={cadNombre}>{cadEtiqueta}</ElmEtiquetaGbl>
        <ElmGrupoTextoIns>
          <ElmSeleccionGbl name={cadNombre} onChange={onChange}>
            {arrLista.map((value) => {
              // console.log();
              return (
                <option
                  key={value.id}
                  onClick={() => onClick(value.id)}
                  value={value.nombre_empresa}
                  selected={
                    value.nombre_empresa === estEstado.campo ? true : false
                  }
                >
                  {value.nombre_empresa}
                </option>
              );
            })}
            {/* <option value={"Ninguno"}>Selecciona un Elemento</option> */}
          </ElmSeleccionGbl>
          <ElmIconoComboCaja icon={faChevronDown} />
        </ElmGrupoTextoIns>
      </div>
    );
  };
  const datos4 = () => {
    return (
      <div>
        <ElmEtiquetaGbl htmlFor={cadNombre}>{cadEtiqueta}</ElmEtiquetaGbl>
        <ElmGrupoTextoIns>
          <ElmSeleccionGbl name={cadNombre} onChange={onChange}>
            {arrLista.map((value) => {
              return (
                <option
                  key={value.id}
                  onClick={() => onClick(value.id)}
                  value={value.id}
                >
                  {value.nombre_cliente}
                </option>
              );
            })}
            {/* <option value={""}>Selecciona un Elemento</option> */}
          </ElmSeleccionGbl>
          <ElmIconoComboCaja icon={faChevronDown} />
        </ElmGrupoTextoIns>
      </div>
    );
  };
  const select = {
    1: datos1(),
    2: datos2(),
    3: datos3(),
    4: datos4(),
  };
  return <div>{select[tipoDatos || 1]}</div>;
};

export default CompSeleccion;
