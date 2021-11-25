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
  idcuenta,
  fecha_movimiento,
  mov
) => {
  await fb.db
    .collection("movimiento")
    .doc()
    .set({
      fecha_movimiento: idcuenta,
      idcuenta: fecha_movimiento,
      mov: mov,
    });
};

const guardarAbonos = async (
  fecha_abono,
  cant_abonada,
  idventa,
  id
) => {
  await   
  fb.db
    .collection("abono")
    .doc(id)
    .update({
      cant_abonada: cant_abonada,
      fecha_abono: fecha_abono,
      idventa: idventa
    });
};
const ActualizarVenta= async (
  estatus,  
  idventa  
  )=> {
  await   
  fb.db
    .collection("venta")
    .doc(idventa)
    .update({
      estatus: estatus,      
    });
};

const guardarClientes = async (
  nombre_cliente,
  apaterno,
  amaterno,
  direccion,
  telefono
) => {
  await fb.db
    .collection("cliente")
    .doc()
    .set({
      nombre_cliente: nombre_cliente,
      apaterno: apaterno,
      amaterno: amaterno,
      direccion: direccion,
      telefono: telefono
    });
};

const guardarVentas = async (
  estatus,
  fecha_venta,
  idcliente,
  total,
  uuid
) => {
   const docRef = await fb.db
    .collection("venta")
    .doc(uuid)
    .set({
      estatus: estatus,
      fecha_venta: fecha_venta,
      idcliente: idcliente,
      total: total
    });
};

const crearAbonos = async (
  fecha_abono,
  cant_abonada,
  idventa,
  idabono
  ) => { await fb.db
    .collection("abono")
    .doc(idabono)
    .set({
      cant_abonada: cant_abonada,
      fecha_abono: fecha_abono,
      idventa: idventa
    });
};

const agregarProdxVenta = async (
  cantidad,
  idproducto,
  idventa,
  subtotal,
  ) => { await fb.db
    .collection("prod_venta")
    .doc()
    .set({
      cantidad: cantidad,
      idproducto: idproducto,
      idventa: idventa,
      subtotal: subtotal
    });
};

const agregarEntrega = async (
  fecha_ent,
  hora_ent,
  idventa,
  referencia,
  ) => { await fb.db
    .collection("entrega")
    .doc()
    .set({
      estado: "pendiente",
      fecha_ent: fecha_ent,
      hora_ent: hora_ent,
      idventa: idventa,
      referencia: referencia

    });
};



export {
  tomarTabla,
  guardarProductos,
  guardarProveedores,
  actualizar,
  guardarMovimientos,
  guardarAbonos,
  ActualizarVenta,
  guardarClientes,
  guardarVentas,
  crearAbonos,
  agregarProdxVenta,
  agregarEntrega,
};
