import firebase from "./conexion";
import { MostrarAlerta1 } from "../components/CmpAlertas";

const tomarTabla = async (estCambiarEstado, cadTabla) => {
  await firebase.db.collection(cadTabla).onSnapshot((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    estCambiarEstado(docs);
    console.log(docs);
  });
};
const actualizar = async (col, id, data) => {
  await firebase.db.collection(col).doc(id).update(data);
};

const guardarProveedores = async (
  correo,
  direccion,
  nombre_empresa,
  telefono
) => {
  await firebase.db.collection("proveedor").doc().set({
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
  await firebase.db
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
  await firebase.db
    .collection("movimiento")
    .doc()
    .set({
      fecha_movimiento: fecha_movimiento,
      idcuenta: idcuenta.id,
      mov: mov.campo
    });
};

const RegistraUsuario = async (nombre, apaterno, amaterno, correo, contra) => {
  console.log("Registrando");
  await firebase
    .auth()
    .createUserWithEmailAndPassword(correo, contra)
    .then((resp) => {
      firebase.db.collection("usuario").doc(resp.user.uid).set({
        amaterno: amaterno,
        apaterno: apaterno,
        contra: contra,
        correo: correo,
        nombre_usuario: nombre,
        tipo_usuario: "Vendedor",
      });
      console.log("Usuario registrado");
      MostrarAlerta1(
        "Usuario agregado correctamente",
        "Registro realizado",
        1,
        () => {}
      );
      // console.log("---"+respuesta);
      // return respuesta = Promise.resolve(1);
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("Correo repetido");
        MostrarAlerta1(
          "El correo ya existe",
          "Problema al registrar",
          2,
          () => {}
        );
        return error.code;
        // console.log("---"+respuesta);
        // return respuesta = Promise.resolve(2);
      } else {
        MostrarAlerta1(
          "Error en la conexión",
          "Problema al registrar",
          2,
          () => {}
        );
        // console.log("---"+respuesta);
        return error.code;
      }
    });
};

export {
  tomarTabla,
  guardarProductos,
  guardarProveedores,
  RegistraUsuario,
  actualizar,
  guardarMovimientos
};
