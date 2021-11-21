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
const guardarProductos = async (existencia,marca,modelo,nombre_producto,precio) => {
  await firebase.db
    .collection("producto")
    .doc()
    .set({ existencia:existencia.campo, marca:marca.campo, modelo:modelo.campo,nombre_producto:nombre_producto.campo,precio:precio.campo});
};

export { tomarTabla,guardarProductos};
