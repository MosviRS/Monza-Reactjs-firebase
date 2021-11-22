/*
SlimeDev
servicios - Controlador
Fecha de creación: 07/11/2021 
  - Responsable: 
      César Pedraza Hernández,
      Alan Alexis Vélazquez Romero,
      Carlos López Palma, 
      Uriel Garcia Martinez,
Autorizó: David Vélazquez Ramirez / Diego Cruz Barajas
Modificaciones:
-07/11/2021  Creacion de funcion de guardarProveedor
-13/11/2021  Correcciones en tipo de usuario
Archivos relacionados: VstIns.js, Vstreg.js, VstNt.js, VstPdts.js, VstAbns.js
VstEtgs.js, VstPvds.js, VstBit.js
*/

import fb from "./conexion";
import fb2 from "./conexion";
import firebase from "firebase";
import { MostrarAlerta1 } from "../components/CmpAlertas";

const tomarTabla = async (estCambiarEstado, cadTabla) => {
  await fb.db.collection(cadTabla).onSnapshot((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    estCambiarEstado(docs);
    console.log(docs);
  });
};
const actualizar = async (col, id, data) => {
  await fb.db.collection(col).doc(id).update(data);
};

const guardarProveedores = async (
  correo,
  direccion,
  nombre_empresa,
  telefono
) => {
  await fb.db.collection("proveedor").doc().set({
    correo: correo,
    direccion: direccion,
    nombre_empresa: nombre_empresa,
    telefono: telefono,
  });
};

const guardarProductos = async (
  existencia,
  marca,
  modelo,
  nombre_producto,
  precio,
  proveedor
) => {
  await fb.db
    .collection("producto")
    .doc()
    .set({
      existencia: existencia.campo,
      marca: marca.campo,
      modelo: modelo.campo,
      nombre_producto: nombre_producto.campo,
      precio: precio.campo,
      proveedor: proveedor.campo,
    });
};
const guardarMovimientos = async (
  fecha_movimiento,
  idcuenta,
  mov
) => {
  await fb.db
    .collection("movimiento")
    .doc()
    .set({
      fecha_movimiento: fecha_movimiento,
      idcuenta: idcuenta.id,
      mov: mov.campo
    });
};

export {
  tomarTabla,
  guardarProductos,
  guardarProveedores,
  actualizar,
  guardarMovimientos
};
