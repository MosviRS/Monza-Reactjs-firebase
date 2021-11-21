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
