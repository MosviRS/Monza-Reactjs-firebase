import firebase from "firebase";
import "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeS-ZZOWn1Z5oxVzjX42TsDfbFvONs5qw",
  authDomain: "monza-daa09.firebaseapp.com",
  projectId: "monza-daa09",
  storageBucket: "monza-daa09.appspot.com",
  messagingSenderId: "928034518483",
  appId: "1:928034518483:web:3aa6a85e3c27146b5beb26",
  measurementId: "G-TNKYMQ8PLM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth;

export default {
  firebase,
  db,
  auth
};

