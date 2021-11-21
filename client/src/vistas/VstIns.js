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

import {
  MostrarAlerta1
} from "../components/CmpAlertas";
import {
  Colores,
  ElmCont2VStIns,
  ElmContVStIns,
  ElmTituloVStIns,
  ELmVStIns,
} from "../Elementos/Elementos";
// Componentes
import CmpTexto from "../components/CmpTexto";
import CmpBotonPrincipal from "../components/CmpBotonPrincipal";


const VstIns = () => {
  // Estilo del fondo
  document.body.style = "background:" + Colores.ColHueso + ";";

  // Variables de estado
  const [correo, cambiarCorreo] = useState({ 
    campo: ""
  });
  const [contrasenia, cambiarContrasenia] = useState({
    campo: ""
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
    var length=history.length;     
    history.go(-length);
    history.replace("/2");
  };


  useEffect(() => {
    
    const ac = new AbortController();

    firebase.auth().onAuthStateChanged(function(user) {
      if(user != null){
        ac.abort()
        setTimeout(()=>{
          irNotas()
        }, 0);
        
      }
    })

    return () => ac.abort();
  });


  const inicia = () => {
    
    if(correo.campo == null || contrasenia.campo == null
      || correo.campo === '' || contrasenia.campo === ''){
      const mensaje  = 'Campos vacio, rellena los campos antes de inciar sesion';

      MostrarAlerta1("", mensaje, "2", () => (console.log()));
      console.log(mensaje)
    }else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(correo.campo, contrasenia.campo)
             .then((userCredential) => {
               // Signed in
               const user = userCredential.user;
               const mensaje  = 'Usuario iniciado para: ' + user.email;

               MostrarAlerta1("Correcto", mensaje, "1", () => (console.log()));
               console.log(mensaje)
               
               cambiarCorreo({campo: ""})
               cambiarContrasenia({campo: ""})
               setTimeout(()=>{
                irNotas()
              }, 0);
               
             })
             .catch((error) => {
               const mensaje  = 'Credenciales incorrectas del usuario';

               MostrarAlerta1("", mensaje, "2", () => (console.log()));
               console.log(mensaje)
            });
        })
        .catch((error) => {
          // Handle Errors here.
        });
      
    }
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
            cadTipofuncion={"0"}
            cadTipo={"1"}
            funcion={() => inicia()}
            cadTexto={"Ingresar"}
          />
        </div>
        <div className="boton2">
          <CmpBotonPrincipal
            cadTipofuncion={"8"}
            cadMensaje={"Mensaje de prueba"}
            //funcion={() => inicia()}
            cadTipo={"5"}
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
