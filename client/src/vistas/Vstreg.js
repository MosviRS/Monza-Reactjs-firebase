/*
SlimeDev
VstReg - Vista
Fecha de creación: 10/11/2021 - 
      Responsable: 
      Uriel Garcia Martinez, 
      David Vélazquez Ramírez
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-
-19/11/2021 - Correciones 
Archivos relacionados: Elementos.js, CmpBotonPrincipal.js CmpTextoForm.js CmpCajaCombo.js, 
*/
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//importacion de Elementos graficos
import {
  ElmCont2VStReg,
  ElmContVStReg,
  ELmVStIns,
} from "../Elementos/Elementos";
//Importacion Componentes
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";
import CmpTextoForm from "../components/CmpTextoForm";
import CmpCajaCombo from "../components/CmpCajaCombo";
import { RegistraUsuario } from "../bd/servicios";
import { MostrarAlerta1 } from "../components/CmpAlertas";
import firebase from "./../bd/conexion";
import firebase2 from "firebase";

const VstReg = () => {
  //Estilo del Fondo
  document.body.style =
    "background: url( https://cdn.discordapp.com/attachments/900274199954849819/909886266085081139/toa-heftiba-FV3GConVSss-unsplash.jpg ) ;" +
    "background-repeat: no-repeat;" +
    "background-position: center center;" +
    "@media (max-width: 1000px) {background-size: auto; }";

  //Variables estado
  const [btnControl, definirbtnControl] = useState(null);
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [apPaterno, cambiarApPaterno] = useState({ campo: "", valido: null });
  const [apMaterno, cambiarApMaterno] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [repContra, cambiarRepContra] = useState({ campo: "", valido: null });
  const [contrasenia, cambiarContrasenia] = useState({
    campo: "",
    valido: null,
  });

  //Variables Complementarias
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,45}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,45}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,15}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  const history = useHistory();

  //Funciones
  const validarcontraseña2 = () => {
    if (contrasenia.campo.length > 0) {
      if (contrasenia.campo !== repContra.campo) {
        cambiarRepContra((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarRepContra((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };
  const irInicio = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/");
  };
  const irNotas = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/2");
  };
  const irRegistro = () => {
    var length = history.length;
    history.go(-length);
    window.location.replace("/1");
  };

  const Rutas = {
    1: irInicio,
    2: irNotas,
    3: irRegistro, 
  };

  //procesos detras del renderizado de react
  useEffect(() => {
    var mensaje = "";
    //Verifica sesion
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        const email = user.email

        mensaje = "Se restablecio la sesion para: " + email;
        console.log(mensaje);

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

  }, []);

  //Validacion de campos de registro
  const ValidaCampos = () => {
    var resp = 0

    if (
      nombre.valido === "true" &&
      apPaterno.valido === "true" &&
      apMaterno.valido === "true" &&
      correo.valido === "true" &&
      repContra.valido === "true" &&
      contrasenia.valido === "true"
    ) {
    //Crear usario con segunda instancia de firebase evitando un cierre de sesion del usuario actual
      var instancia2 = firebase2.initializeApp(firebase.firebaseConfig, 'Secondary');
      instancia2.auth().createUserWithEmailAndPassword( correo.campo, contrasenia.campo).then((resp) => {

        instancia2.database().goOffline()
          //Insercion de datos a su coleccion
          firebase.db.collection("usuario").doc(resp.user.uid).set({
            amaterno: apMaterno.campo,
            apaterno: apMaterno.campo,
            correo: correo.campo,
            nombre_usuario: nombre.campo,
            tipo_usuario: "Vendedor",
          });
    
          console.log("Usuario registrado");
          setTimeout(() => {
            irNotas()
          }, 1000);
          MostrarAlerta1(
            "Usuario agregado correctamente",
            "Registro realizado",
            1,
            () => {}
          );

          
      })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("Correo repetido");
            setTimeout(() => {
              irRegistro()
            }, 1000);
            MostrarAlerta1(
              "El correo ya existe",
              "Problema al registrar",
              2,
              () => {}
            );
            
          } else {
            setTimeout(() => {
              irRegistro()
            }, 1000);
            MostrarAlerta1(
              "Error en la conexión",
              "Problema al registrar",
              2,
              () => {}
            );
            
          }
        });

    } else {
      if ((repContra.valido === "false") | (contrasenia.valido === "false")) {
        MostrarAlerta1(
          "Contraseñas no coinciden",
          "Problema al registrar",
          2,
          () => {}
        );
      } else {
        MostrarAlerta1(
          "Llene todos los campos",
          "Problema al registrar",
          2,
          () => {}
        );
      }
    }

  };

  //rederizacion
  return (
    <ELmVStIns>
      <ElmContVStReg>
        <div className="titulo">Registro</div>
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={nombre}
          estCambiarEstado={cambiarNombre}
          bolTipo={true}
          cadEtiqueta="Nombre"
          cadPlaceholder="Juan"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Nombre"}
          exprExpresionR={expresiones.nombre}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={apPaterno}
          estCambiarEstado={cambiarApPaterno}
          bolTipo={true}
          cadEtiqueta="Apellido Paterno"
          cadPlaceholder="Lopez"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"ApellidoPaterno"}
          exprExpresionR={expresiones.nombre}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={apMaterno}
          estCambiarEstado={cambiarApMaterno}
          bolTipo={true}
          cadEtiqueta="Apellido Materno"
          cadPlaceholder="Ramirez"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"ApellidoMaterno"}
          exprExpresionR={expresiones.nombre}
        />
        <CmpTextoForm
          cadTipoprincipal="1"
          estEstado={correo}
          estCambiarEstado={cambiarCorreo}
          bolTipo={true}
          cadEtiqueta="Correo"
          cadPlaceholder="example32@example.com"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Correo"}
          exprExpresionR={expresiones.correo}
        />
      </ElmContVStReg>
      <ElmCont2VStReg>
        <CmpTextoForm
          cadTipoprincipal="2"
          estEstado={contrasenia}
          estCambiarEstado={cambiarContrasenia}
          bolTipo={true}
          cadEtiqueta="Contraseña"
          cadPlaceholder="Contraseña"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"Contraseña"}
          exprExpresionR={expresiones.password}
        />
        <CmpTextoForm
          cadTipoprincipal="2"
          estEstado={repContra}
          estCambiarEstado={cambiarRepContra}
          bolTipo={true}
          cadEtiqueta="Repetir Contraseña"
          cadPlaceholder="Contraseña"
          cadLeyenda="ejemplo solo letras, 10 a 15 caracteres etc..."
          bolObligatorio={true}
          cadNombre={"RepetirContraseña"}
          funcion={validarcontraseña2}
          exprExpresionR={expresiones.password}
        />
        <div className="botones">
          <div className="boton1">
            <CmpBotonPrincipal
              bolVisibilidad={true}
              cadTipofuncion="0"
              cadTipo="1"
              funcion={() => {
                ValidaCampos();
              }}
              cadTexto="Registrar"
              cadMensaje="Registro"
            />
          </div>
          <div className="boton2">
            <CmpBotonPrincipal
              bolVisibilidad={true}
              cadTipofuncion="0"
              cadTipo="2"
              funcion={Rutas[2]}
              cadTexto="Regresar"
              cadMensaje="Datos Guardados correctamente"
            />
          </div>
        </div>
      </ElmCont2VStReg>
    </ELmVStIns>
  );
};
export default VstReg;
