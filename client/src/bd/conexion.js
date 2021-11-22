/*
SlimeDev
conexion - controlador
Fecha de creación: 07/11/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Uriel Garcia Martinez,
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-07/11/2021 Creacion export
-13/11/2021 Correcciones en llamado de componentes Firebase
-20/11/2021 Correciones en el Auth de firebase
Archivos relacionados: VstIns.js, Vstreg.js, VstNt.js, VstPdts.js, VstAbns.js
VstEtgs.js, VstPvds.js, VstBit.js
*/

import firebase from "firebase";
import "firebase/firestore";
import {} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeS-ZZOWn1Z5oxVzjX42TsDfbFvONs5qw",
  authDomain: "monza-daa09.firebaseapp.com",
  projectId: "monza-daa09",
  storageBucket: "monza-daa09.appspot.com",
  messagingSenderId: "928034518483",
  appId: "1:928034518483:web:3aa6a85e3c27146b5beb26",
  measurementId: "G-TNKYMQ8PLM",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth;
const persistance = firebase.persistance;

const variables = {
  firebase,
  db,
  auth,
  persistance,
};

export default variables;
