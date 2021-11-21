/*
SlimeDev
Elementos - elementos
Fecha de creación: 16/10/2021 - Responsable: César Pedraza Hernández, Alan Vélazquez, Carlos López Palma
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-8/11/2021 Diseño responsivo para móviles, elementos graficos, estilos, etc. Para la vista de la página de inicio(VstIns). 
-18/11/2021 
  diseño de vistas restantes
    'VstNt'
    'VstPdts'
    'VstAbns'
    'VstEtgs'
    'VstPvds'
    'VstBit'
-19/11/2021 Correcciones de diseño de componentes y vistas
  correccion de diseño en tablas, y Formularios
Archivos relacionados:, 
*/
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
// Colores
const Colores = {
  ColBlanco: "#FFFF",
  ColHueso: "#F3F0EB",
  ColNegroJet: "#2D2C2F",
  ColNegroProgreso: "#4E4A47",
  ColNaranja: "#FF9F1C",
  ColRojo: "#D6001C",
  ColVerde: "#1CCE28",
  ColNaranjaOpacidad: "rgba(255,159,28,0.7)",
};
// Tipografías
const Tipografias = {
  Titulo1: {
    fontFamily: "Nunito Sans",
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
//Cadenas
const Cadenas = {
  vstNt: "Ventas",
  vstPdts: "Productos",
  vstAbns: "Abonos",
  vstEtgs: "Entregas",
  vstPvds: "Proveedores",
  vstBit: "Bitácora",
  vstReg: "Personal",
  cerrarSesion: "Cerrar Sesión",
};

// Componentes
const ElmGrupoTextoIns = styled.div`
  position: relative;
  z-index: 0;
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
      display: none;
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
      display: none;
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
    props.obligatorio === false &&
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
  z-index: 0;
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
  z-index: 2;
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
  ${(props) =>
    props.tipo === "5" &&
    css`
      font-size: ${Tipografias.Normal.fontSize};
      font-family: ${Tipografias.Normal.fontFamily};
      font-weight: ${Tipografias.Normal.fontweight};
      height: 35px;
      line-height: 35px;
      background: ${Colores.ColNegroJet};
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
    background: ${Colores.ColNegroJet};
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
  ${(props) =>
    props.tipo === "3" &&
    css`
      text-align: center;
      background: ${Colores.ColNaranja};
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
  @media (max-width: 1000px) {
    padding: 15px 15px 15px 15px;
  }
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

  @media (max-width: 1000px) {
    /* white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; */
    font-family: ${Tipografias.Normal.fontFamily};
    font-size: ${Tipografias.Normal.fontSize};
    font-weight: ${Tipografias.Normal.fontweight};
    > div {
      max-width: 80px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
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
  @media (max-width: 1000px) {
    > div {
      /* max-width: 100px; */
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;
const ElmFecha = styled(DatePicker)`
  z-index: 2;
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
  &:hover {
    border: 2px solid ${Colores.ColNegroJet};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
`;

// Vistas
// VStIns
const ELmVStIns = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1240px;
  width: 100%;
  height: 735px;
  margin: auto;
  margin-top: 100px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }
`;
const ElmContVStIns = styled.div`
  display: grid;
  grid-template-rows: 0px 248px repeat(4, 1fr);
  border-radius: 20px 0 0 20px;
  background: ${Colores.ColBlanco};
  > .entrada {
    margin-left: 117px;
    margin-right: 117px;
    margin-top: 60px;
  }
  > .boton {
    margin-left: 220px;
    margin-right: 220px;
    margin-top: 50px;
  }
  > .boton2 {
    margin-left: 175px;
    margin-right: 175px;
    margin-top: 50px;
  }
  @media (max-width: 1000px) {
    grid-template-rows: 0px 148px repeat(4, 100px);
    border-radius: 20px;
    > .entrada {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 70px;
    }
    > .boton {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 50px;
    }
    > .boton2 {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 50px;
    }
  }
`;
const ElmCont2VStIns = styled.div`
  border-radius: 0 20px 20px 0;
  background: url("https://images.unsplash.com/photo-1585733254318-9bcc6d81584a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1935&q=80");
  height: 100%;
  background-size: cover; /* <------ */
  background-repeat: no-repeat;
  background-position: center center;
  > div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 20px 20px 0;
    background: ${Colores.ColNaranjaOpacidad};
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
const ElmIconAddUser = styled(FontAwesomeIcon)`
  margin-top: 40px;
  margin-left: 40px;
  font-size: 50px;
  color: ${Colores.ColNegroJet};
  &:hover {
    color: ${Colores.ColNaranja};
  }
`;
const ElmTituloVStIns = styled.div`
  margin-top: 200px;
  color: ${Colores.ColNegroJet};
  align-items: center;
  text-align: center;
  font-family: ${Tipografias.Titulo1.fontFamily};
  font-size: ${Tipografias.Titulo1.fontSize};
  font-weight: ${Tipografias.Titulo1.fontweight};
  @media (max-width: 1000px) {
    margin-top: 20px;
  }
`;

//Vista VstReg
const ElmContVStReg = styled.div`
  border-radius: 20px 0 0 20px;
  background: ${Colores.ColBlanco};
  padding-left: 116px;
  padding-right: 116px;
  .titulo {
    align-items: center;
    text-align: center;
    font-family: ${Tipografias.Titulo1.fontFamily};
    font-weight: ${Tipografias.Titulo1.fontweight};
    font-size: ${Tipografias.Titulo1.fontSize};
  }
  > div {
    padding-top: 30px;
  }
  @media (max-width: 1000px) {
    border-radius: 20px 20px 0 0;
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const ElmCont2VStReg = styled.div`
  border-radius: 0 20px 20px 0;
  background-color: ${Colores.ColHueso};
  padding-top: 95px;
  padding-left: 116px;
  padding-right: 116px;

  > div {
    padding-top: 30px;
  }
  .botones {
    display: grid;
    padding-top: 30px;
    grid-template-columns: repeat(2, 1fr);
  }
  .boton1 {
    margin-right: 10px;
  }
  .boton2 {
    margin-left: 10px;
  }

  @media (max-width: 1000px) {
    border-radius: 0 0 20px 20px;
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background-color: ${Colores.ColBlanco};
  }
`;
//Vista VstNt
const ElmVstNt = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  .titulo {
    color: ${Colores.ColBlanco};
    align-items: center;
    text-align: center;
    font-family: ${Tipografias.Titulo1.fontFamily};
    font-weight: ${Tipografias.Titulo1.fontweight};
    font-size: ${Tipografias.Titulo1.fontSize};
  }
  .contenedor1 {
    /* background: ${Colores.ColVerde}; */
    padding-left: 20px;
    padding-right: 20px;
    > div {
      padding-top: 32px;
    }
  }
  .contenedor2 {
    display: grid;
    grid-template-columns: 75% 25%;
    margin-top: 30px;
    margin-right: -10px;
    border-radius: 20px 0 0 0;
    background: ${Colores.ColHueso};
    .subCont1 {
      margin-top: ${(props) => props.subCont1 || "0px"};
      margin-left: 60px;
      margin-right: 60px;
    }
    .subCont2 {
      margin-top: 0px;
      margin-left: 0px;
      margin-right: 0px;
    }
  }
  .contenedor3 {
    margin-top: 30px;
    margin-right: -10px;
    border-radius: 20px 0 0 0;
    background: ${Colores.ColHueso};
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    .titulo {
    }
    .contenedor1 {
    }
    .contenedor2 {
      display: grid;
      grid-template-columns: 1fr;
      margin-right: 0px;
      border-radius: 20px;
      background: ${Colores.ColHueso};
      .subCont1 {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
      }
      .subCont2 {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
      }
    }
    .contenedor3 {
      display: grid;
      grid-template-columns: 1fr;
      margin-right: 0px;
      border-radius: 20px;
      background: ${Colores.ColHueso};
    }
  }
`;

const ElmEncabezadoNt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  background: ${Colores.ColBlanco};
  border-radius: 20px;
  .cont1 {
    padding-right: 20%;
  }
  .cont2 {
    padding-left: 20%;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    .cont1 {
      padding-right: 0;
    }
    .cont2 {
      padding-top: 10px;
      padding-left: 0;
    }
  }
`;
const ElmContNt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  margin-top: 20px;
  background: ${Colores.ColBlanco};
  border-radius: 20px;
  .titulo {
    color: ${Colores.ColNegroJet};
    align-items: left;
    text-align: left;
    font-family: ${Tipografias.Titulo2.fontFamily};
    font-weight: ${Tipografias.Titulo2.fontweight};
    font-size: ${Tipografias.Titulo2.fontSize};
  }
  .busqueda {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 10%;
  }
  .tres {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column: span 2;
  }
  .tabla {
    display: grid;
    margin-top: 20px;
    grid-column: span 2;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    .titulo {
      grid-column: span 2;
    }
    .busqueda {
      margin-top: 20px;
      grid-column: span 2;
      grid-template-columns: 1fr 15%;
    }

    .tabla {
      grid-column: span 2;
    }
  }
`;
const ElmIconAddProduct = styled(FontAwesomeIcon)`
  margin-top: 2px;
  margin-left: 5px;
  font-size: 50px;
  align-items: center;
  text-align: center;
  color: ${Colores.ColNaranja};
  &:hover {
    color: ${Colores.ColNegroJet};
  }
  @media (max-width: 1000px) {
    margin-top: 8px;
    margin-left: 5px;
    font-size: 40px;
  }
`;
const ElmFormNt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  background: ${Colores.ColBlanco};
  border-radius: 20px;
  .titulo {
    display: grid;
    grid-column: span 2;
    padding-bottom: 30px;
    color: ${Colores.ColNegroJet};
    align-items: center;
    text-align: center;
    font-family: ${Tipografias.Titulo2.fontFamily};
    font-weight: ${Tipografias.Titulo2.fontweight};
    font-size: ${Tipografias.Titulo2.fontSize};
  }
  > div {
    padding-top: 10px;
    display: grid;
    grid-column: span 2;
  }
  .conjunto1 {
    display: grid;
    grid-column: span 1;
    padding-right: 10px;
  }
  .conjunto2 {
    display: grid;
    grid-column: span 1;
    grid-row: span 2;
  }
  @media (max-width: 1000px) {
    /* padding: 20px; */
    margin-top: 20px;
    margin-right: 0px;
    .conjunto2 {
      margin-top: 40px;
      /* margin-left: 5px; */
      display: grid;
      grid-column: span 1;
      grid-row: span 2;
    }
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
  Cadenas,
  ElmTituloAlerta,
  ElmDescripcionAlerta,
  ELmContenedorTabla,
  ELmContenedorTablaCont,
  ELmVStIns,
  ElmContVStIns,
  ElmCont2VStIns,
  ElmIconAddUser,
  ElmTituloVStIns,
  ElmContVStReg,
  ElmCont2VStReg,
  ElmVstNt,
  ElmEncabezadoNt,
  ElmFecha,
  ElmContNt,
  ElmIconAddProduct,
  ElmFormNt,
};
