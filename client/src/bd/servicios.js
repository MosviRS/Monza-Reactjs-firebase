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
export { tomarTabla };

//Funcion guardar para la tabla 
const guardarProveedores = async (correo,direccion, nombre_empresa, telefono) => {
  await firebase.db
    .collection("proveedor")
    .doc()
    .set({ correo: correo, direccion:direccion, nombre_empresa:nombre_empresa,telefono:telefono });  
};
export {guardarProveedores};


