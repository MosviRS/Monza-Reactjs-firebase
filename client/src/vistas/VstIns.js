/*
SlimeDev
VstIns - Vista
Fecha de creación: 16/10/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Uriel Garcia Martinez,
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-8/11/2021 Creacion de la vista VstIns
-15/11/2021 Correcciones en comentarios
-19/11/2021 - Correciones 
Archivos relacionados: Elementos.js, CmpTexto.js, CmpBotonPrincipal.js
*/
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import firebase from "./../bd/conexion";

import { MostrarAlerta1, MostrarAlerta4, MostrarAlerta5 } from "../components/CmpAlertas";
import {
  Colores,
  ElmCont2VStIns,
  ElmContVStIns,
  ElmTituloVStIns,
  ELmVStIns,
} from "../Elementos/Elementos";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Componentes
import CmpTexto from "../components/CmpTexto";
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";

const VstIns = () => {
  // Estilo del fondo
  document.body.style = "background:" + Colores.ColHueso + ";";

  // Variables de estado
  
  const [correo, cambiarCorreo] = useState({
    campo: "",
  });
  const [contrasenia, cambiarContrasenia] = useState({
    campo: "",
  });

  //Variables complementarias
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  const history = useHistory();
  //Funciones

  const irNotas = () => {
    var length = history.length;
    history.go(-length);
    history.replace("/2");
  };

  useEffect(() => {
    //Verifica sesion activa
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        setTimeout(() => {
          irNotas();
        }, 0);
      }
    });

  }, []);

  //Inicio de sesion
  const inicia = () => {
    if (
      correo.campo == null ||
      contrasenia.campo == null ||
      correo.campo === "" ||
      contrasenia.campo === ""
    ) {
      const mensaje = "Campos vacio, rellena los campos antes de inciar sesion";

      MostrarAlerta1("", mensaje, "2", () => console.log());
      console.log(mensaje);
    } else {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(correo.campo, contrasenia.campo)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              const mensaje = "Usuario iniciado para: " + user.email;

              MostrarAlerta1("Correcto", mensaje, "1", () => console.log());
              console.log(mensaje);

              cambiarCorreo({ campo: "" });
              cambiarContrasenia({ campo: "" });
              setTimeout(() => {
                irNotas();
              }, 0);
            })
            .catch((error) => {
              const mensaje = "Credenciales incorrectas del usuario";

              MostrarAlerta1("", mensaje, "2", () => console.log());
              console.log(mensaje);
            });
        })
        .catch((error) => {
        });
    }
  };
  
  //funcion para recuperar la contraseña
  const recuperarContra = (email) =>{
    console.log(email)
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        console.log('se envio la repueracion de contraseña')
        MostrarAlerta5(email, 'success', 'Recuperacion exitosa', `Verifica ${email} para restablecer tu contraseña !`)
      })
      .catch((error) => {
        console.log('se envio la repueracion de contraseña')
        MostrarAlerta5(email, 'error', 'Opps...', `Hubo un problema al restablecer la contraseña de ${email} \n Contacta a un gerente para mayor informacion`)
      });

  }

  //rederizacion
  return (
    <ELmVStIns>
      <ElmContVStIns>
        <div></div>
        <ElmTituloVStIns>Inicio de Sesión</ElmTituloVStIns>

        <div className="entrada">
          <CmpTexto
            cadTipoprincipal={"1"}
            estEstado={correo}
            estCambiarEstado={cambiarCorreo}
            bolTipo={true}
            cadPlaceholder={"Correo"}
            cadNombre={"Correo"}
            exprExpresionR={expresiones.correo}
          />
        </div>
        <div className="entrada">
          <CmpTexto
            cadTipoprincipal={"2"}
            estEstado={contrasenia}
            estCambiarEstado={cambiarContrasenia}
            bolTipo={false}
            cadPlaceholder={"Contraseña"}
            cadNombre={"contraseña"}
            exprExpresionR={expresiones.password}
          />
        </div>
        <div className="boton">
          <CmpBotonPrincipal
            bolVisibilidad={true}
            cadTipofuncion={"0"}
            cadTipo={"1"}
            funcion={() => inicia()}
            cadTexto={"Ingresar"}
          />
        </div>
        <div className="boton2">
          <CmpBotonPrincipal
            bolVisibilidad={true}
            cadTipofuncion={"0"}
            cadMensaje={"Mensaje de prueba"}
            cadTipo={"5"}
            funcion={() => MostrarAlerta4(recuperarContra)}
            cadTexto={"Olvide mi Contraseña"}
          />
        </div>
      </ElmContVStIns>
      <ElmCont2VStIns>
        <div></div>
      </ElmCont2VStIns>
    </ELmVStIns>
  );
};
export default VstIns;
