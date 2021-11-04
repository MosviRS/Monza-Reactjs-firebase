/*
SlimeDev
Elementos - elementos
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
Archivos relacionados:, 
*/
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Colores = {
  ColBlanco: "#FFFF",
  ColHueso: "#F3F0EB",
  ColNegroJet: "#2D2C2F",
  ColNegroProgreso: "#4E4A47",
  ColNaranja: "#FF9F1C",
  ColRojo: "#D6001C",
  ColVerde: "#1CCE28",
};

const Tipografias = {
  Titulo1: {
    fontFamily: "Nunito-Sans",
    fontweight: 800,
    fontSize: "48px",
  },
  Titulo2: {
    fontFamily: "Rubik",
    fontweight: 500,
    fontSize: "24px",
  },
  Titulo3: {
    fontFamily: "Rubik",
    fontweight: 500,
    fontSize: "18px",
  },
  Titulo4: {
    fontFamily: "Rubik",
    fontweight: 500,
    fontSize: "16px",
  },
  Normal: {
    fontFamily: "Rubik",
    fontweight: 500,
    fontSize: "14px",
  },
  Enfasis: {
    fontFamily: "Rubik",
    fontweight: 300,
    fontSize: "12px",
  },
};

const ElmGrupoTextoIns = styled.div`
  position: relative;
  z-index: 90;
`;

const ElmTextoIns = styled.input`
  width: 100%;
  background: ${Colores.ColBlanco};
  border-radius: 10px;
  height: 45px;
  line-height: 45px;
  transition: 0.3s ease all;
  border: 2px solid ${Colores.ColNegroJet};
  font-size: ${Tipografias.Titulo3.fontSize};
  font-family: ${Tipografias.Titulo3.fontFamily};
  font-weight: ${Tipografias.Titulo3.fontweight};
  color: ${Colores.ColNegroJet};
  &:focus {
    border: 2px solid ${Colores.ColNegroJet};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }

  ${(props) =>
    props.tipoprincipal === "1" &&
    css`
      padding: 0 10px 0 10px;
    `}
  ${(props) =>
    props.tipoprincipal === "2" &&
    css`
      padding: 0 38px 0 10px;
    `}
`;
const ElmMuestraIconoIns = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  bottom: 14px;
  z-index: 100;
  font-size: 18px;

  ${(props) =>
    props.tipoprincipal === "1" &&
    css`
      opacity: 0;
    `}
  ${(props) =>
    props.tipoprincipal === "2" &&
    css`
      opacity: 1;
    `}
  ${(props) =>
    props.tipoprincipal === "3" &&
    css`
      opacity: 0;
    `}
`;
const ElmEtiquetaGbl = styled.form`
  display: block;
  font-family: ${Tipografias.Titulo4.fontFamily};
  font-weight: ${Tipografias.Titulo4.fontweight};
  font-size: ${Tipografias.Titulo4.fontSize};
  color: ${Colores.ColNegroJet};
  padding: 0 0 0 10px;
  min-height: 25px;
  cursor: pointer;
`;
const ElmEtiquetaObliGbl = styled.span`
  font-family: ${Tipografias.Titulo4.fontFamily};
  font-weight: ${Tipografias.Titulo4.fontweight};
  font-size: ${Tipografias.Titulo4.fontSize};
  color: ${Colores.ColRojo};
  ${(props) =>
    props.obligatorio === "false" &&
    css`
      opacity: 0;
    `}
`;

const ElmTextoGbl = styled.input`
  width: 100%;
  background: ${Colores.ColBlanco};
  border-radius: 10px;
  height: 45px;
  line-height: 45px;
  transition: 0.3s ease all;
  border: 2px solid ${Colores.ColNegroJet};
  font-size: ${Tipografias.Normal.fontSize};
  font-family: ${Tipografias.Normal.fontFamily};
  font-weight: ${Tipografias.Normal.fontweight};
  color: ${Colores.ColNegroProgreso};
  &:focus {
    border: 2px solid ${Colores.ColNegroJet};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
  ${(props) =>
    props.valido === "true" &&
    css`
      color: ${Colores.ColNegroProgreso};
    `}
  ${(props) =>
    props.valido === "false" &&
    css`
      color: ${Colores.ColRojo};
      &:focus {
        border: 2px solid ${Colores.ColRojo};
        outline: none;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
      }
    `}
  ${(props) =>
    props.tipoprincipal === "1" &&
    css`
      padding: 0 10px 0 10px;
    `}
  ${(props) =>
    props.tipoprincipal === "2" &&
    css`
      padding: 0 38px 0 10px;
    `}
  ${(props) =>
    props.tipoprincipal === "3" &&
    css`
      padding: 0 10px 0 10px;
      background: ${Colores.ColNegroProgreso};
      color: ${Colores.ColBlanco};
    `}
`;

const ElmLeyendaGbl = styled.p`
  font-family: ${Tipografias.Enfasis.fontFamily};
  font-size: ${Tipografias.Enfasis.fontSize};
  font-weight: ${Tipografias.Enfasis.fontweight};
  margin-bottom: 0;
  color: ${Colores.ColNegroProgreso};
  margin-top: 0;
  padding: 0 0 0 10px;
  /* shadow: 3px 0px 30px rgba(163, 163, 163, 0.4); */
  display: block;

  ${(props) =>
    props.valido === "true" &&
    css`
      color: ${Colores.ColNegroProgreso};
    `}
  ${(props) =>
    props.valido === "false" &&
    css`
      color: ${Colores.ColRojo};
    `}
  ${(props) =>
    props.tipoprincipal === "3" &&
    css`
      display: none;
    `}
`;

const ElmTextoBusquedaGbl = styled.input`
  width: 100%;
  background: ${Colores.ColBlanco};
  border-radius: 10px;
  height: 45px;
  padding: 0 10px 0 53px;
  line-height: 45px;
  transition: 0.3s ease all;
  border: 2px solid ${Colores.ColNegroJet};
  font-size: ${Tipografias.Titulo3.fontSize};
  font-family: ${Tipografias.Titulo3.fontFamily};
  font-weight: ${Tipografias.Titulo3.fontweight};
  color: ${Colores.ColNegroJet};
  &:focus {
    border: 2px solid ${Colores.ColNegroJet};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
`;
const ElmIconoBusquedaGbl = styled(FontAwesomeIcon)`
  position: absolute;
  left: 17px;
  bottom: 10px;
  z-index: 100;
  font-size: 25px;
`;
const ElmTextoAreaGbl = styled.textarea`
  width: 100%;
  background: ${Colores.ColBlanco};
  border-radius: 10px;
  height: 114px;
  line-height: 20px;
  padding: 0 10px 0 10px;
  transition: 0.3s ease all;
  border: 2px solid ${Colores.ColNegroJet};
  font-size: ${Tipografias.Normal.fontSize};
  font-family: ${Tipografias.Normal.fontFamily};
  font-weight: ${Tipografias.Normal.fontweight};
  color: ${Colores.ColNegroProgreso};
  &:focus {
    border: 2px solid ${Colores.ColNegroJet};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
`;
const ElmSeleccionGbl = styled.select`
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
  width: 100%;
  background: ${Colores.ColBlanco};
  border-radius: 10px;
  height: 45px;
  padding: 0 10px 0 10px;
  line-height: 45px;
  transition: 0.3s ease all;
  border: 2px solid ${Colores.ColNegroJet};
  font-size: ${Tipografias.Normal.fontSize};
  font-family: ${Tipografias.Normal.fontFamily};
  font-weight: ${Tipografias.Normal.fontweight};
  color: ${Colores.ColNegroJet};
  &:focus {
    border: 2px solid ${Colores.ColNegroJet};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
`;
const ElmIconoComboCaja = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  bottom: 14px;
  z-index: 100;
  font-size: 18px;
  color: ${Colores.ColNegroJet};
`;

const ElmBotonPrincipal = styled.button`
  width: 100%;
  font-size: ${Tipografias.Titulo2.fontSize};
  font-family: ${Tipografias.Titulo2.fontFamily};
  font-weight: ${Tipografias.Titulo2.fontweight};
  color: ${Colores.ColBlanco};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.1s ease all;
  &:hover {
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
  }
  ${(props) =>
    props.tipo === "1" &&
    css`
      height: 55px;
      line-height: 55px;
      background: ${Colores.ColNaranja};
    `}
  ${(props) =>
    props.tipo === "2" &&
    css`
      height: 55px;
      line-height: 55px;
      background: ${Colores.ColNegroProgreso};
    `}
  ${(props) =>
    props.tipo === "3" &&
    css`
      height: 43px;
      line-height: 43px;
      background: ${Colores.ColVerde};
    `}
  ${(props) =>
    props.tipo === "4" &&
    css`
      height: 43px;
      line-height: 43px;
      background: ${Colores.ColRojo};
    `}
`;
const ElmBotonMenu = styled.button`
  height: 45px;
  line-height: 45px;
  width: 100%;
  padding: 0 10px 0 38px;
  font-size: ${Tipografias.Titulo2.fontSize};
  font-family: ${Tipografias.Titulo2.fontFamily};
  font-weight: ${Tipografias.Titulo2.fontweight};
  text-align: left;
  color: ${Colores.ColBlanco};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.1s ease all;
  &:hover {
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
  }
  ${(props) =>
    props.tipo === "1" &&
    css`
      background: ${Colores.ColNaranja};
    `}
  ${(props) =>
    props.tipo === "2" &&
    css`
      background: ${Colores.ColNegroJet};
    `}
`;
const ElmIconoBotonMenu = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  bottom: 14px;
  z-index: 100;
  font-size: 18px;
  color: ${Colores.ColBlanco};
`;
const ElmContenedorRevCaja = styled.div`
  width: 100%;
  background: ${Colores.ColBlanco};
  border-radius: 10px;
  height: auto;
  padding: 25px 25px 25px 25px;
  transition: 0.3s ease all;
  border: 2px solid ${Colores.ColNegroJet};
`;
const ElmEtqRevCajaGbl = styled.form`
  display: block;
  font-family: ${Tipografias.Titulo3.fontFamily};
  font-weight: ${Tipografias.Titulo3.fontweight};
  font-size: ${Tipografias.Titulo3.fontSize};
  color: ${Colores.ColNegroJet};
  padding: 0 0 0 0;
  min-height: 25px;
  cursor: pointer;
`;
const ElmIconoRevCaja = styled.input`
  display: none;

  /* position: absolute; */
  /* visibility: hidden; */
  /* left: 0;
  bottom: 2px;
  font-size: 18px;
  color: ${Colores.ColNegroProgreso}; */
`;
const ElmOpcion = styled.label`
  font-family: ${Tipografias.Titulo3.fontFamily};
  font-weight: ${Tipografias.Titulo3.fontweight};
  font-size: ${Tipografias.Titulo3.fontSize};
  color: ${Colores.ColNegroProgreso};

  cursor: pointer;
  > input {
    /* display: none; */
    /* color: ${Colores.ColNaranja}; */
    /* padding: 20px 0 0 0px; */
  }
  > label {
    /* padding-left: 1.3em;
    position: relative; */
  }
  > label::before {
    /* content: "";
    border: solid 2px ${Colores.ColNegroProgreso};
    border-radius: 3px;
    width: 0.8em;
    height: 0.8em;
    position: absolute;
    left: 0px;
    /* top: 0.1em; */
    /* transition: all 0.8s;
    transform: rotate(0deg); */
  }
  > [type="checkbox"]:checked + label {
    border-color: ${Colores.ColNaranja};
    color: ${Colores.ColNaranja};
    content: "✔";
    /* transform: rotate(360deg); */
  }
`;
const ElmTituloAlerta = styled.p`
  font-family: ${Tipografias.Titulo2.fontFamily};
  font-size: ${Tipografias.Titulo2.fontSize};
  font-weight: ${Tipografias.Titulo2.fontweight};
  color: ${Colores.ColNegroJet};
  padding: 0;
`;
const ElmDescripcionAlerta = styled.p`
  font-family: ${Tipografias.Titulo3.fontFamily};
  font-size: ${Tipografias.Titulo3.fontSize};
  font-weight: ${Tipografias.Titulo3.fontweight};
  color: ${Colores.ColNegroProgreso};
  padding: 0;
`;
const ELmContenedorTabla = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.fraccion}, 1fr);
  height: 80px;
  border-radius: 10px;
  background-color: ${Colores.ColHueso};
  align-items: center;
  text-align: center;
  font-family: ${Tipografias.Titulo3.fontFamily};
  font-size: ${Tipografias.Titulo3.fontSize};
  font-weight: ${Tipografias.Titulo3.fontweight};
`;
const ELmContenedorTablaCont = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.fraccion}, 1fr);
  padding: 17px;
  background-color: ${Colores.ColBlanco};
  align-items: center;
  text-align: center;
  font-family: ${Tipografias.Normal.fontFamily};
  font-size: ${Tipografias.Normal.fontSize};
  font-weight: ${Tipografias.Normal.fontweight};
  &:hover {
    background-color: ${Colores.ColNegroProgreso};
    color: ${Colores.ColBlanco};
    border-radius: 10px;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
  }
`;
export {
  ElmGrupoTextoIns,
  ElmTextoIns,
  ElmMuestraIconoIns,
  ElmEtiquetaGbl,
  ElmLeyendaGbl,
  ElmEtiquetaObliGbl,
  ElmTextoGbl,
  ElmTextoBusquedaGbl,
  ElmIconoBusquedaGbl,
  ElmTextoAreaGbl,
  ElmSeleccionGbl,
  ElmIconoComboCaja,
  ElmBotonPrincipal,
  ElmBotonMenu,
  ElmIconoBotonMenu,
  ElmEtqRevCajaGbl,
  ElmContenedorRevCaja,
  ElmIconoRevCaja,
  ElmOpcion,
  Colores,
  ElmTituloAlerta,
  ElmDescripcionAlerta,
  ELmContenedorTabla,
  ELmContenedorTablaCont,
};
