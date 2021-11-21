import firebase from "./conexion";
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


const guardarProveedores = async (correo,direccion, nombre_empresa, telefono) => {
  await firebase.db
    .collection("proveedor")
    .doc()
    .set({ correo: correo, direccion:direccion, nombre_empresa:nombre_empresa,telefono:telefono });  
};

const guardarProductos = async (existencia,marca,modelo,nombre_producto,precio) => {
  await firebase.db
    .collection("producto")
    .doc()
    .set({ existencia:existencia.campo, marca:marca.campo, modelo:modelo.campo,nombre_producto:nombre_producto.campo,precio:precio.campo});
};

export {tomarTabla,guardarProductos,guardarProveedores};

