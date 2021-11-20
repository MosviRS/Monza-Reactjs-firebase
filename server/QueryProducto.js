const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaProducto = async (req,res)=>{
  const { columna, idprod } = req;
  const respuesta = await pool.query('SELECT * FROM producto WHERE '+columna+' = $1', [idprod]);
  console.log(respuesta.rows);
}
  
const ListaProducto = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM producto');
  console.log(respuesta.rows);
}

const RegistProducto = async (req, res)=>{
  const { idmercancia, marca, modelo, nombre_producto, precio, existencia } =req;
  const respuesta = await pool.query('INSERT INTO producto (idmercancia, marca, modelo, nombre_producto, precio, existencia) '+
   'VALUES ($1, $2, $3, $4, $5, $6)',
    [idmercancia, marca, modelo, nombre_producto, precio, existencia]);
  console.log(respuesta.rows);
}

const BorrarProducto = async (req, res)=>{
  const { idprod } =req;
  const respuesta = await pool.query('DELETE FROM producto WHERE idprod = $1', [idprod]);
  console.log(respuesta.rows);
}

const ModfProducto = async (req, res) =>{
  const { idprod, idmercancia, marca, modelo, nombre_producto, precio, existencia  } =req;
  const resultado = await pool.query('UPDATE producto SET '+
  'idmercancia = $2, '+
  'marca = $3, '+
  'modelo = $4, '+
  'nombre_producto = $5, '+
  'precio = $6, '+
  'existencia = $7 '+
  'WHERE idprod = $1', [idprod, idmercancia, marca, modelo, nombre_producto, precio, existencia]);
  console.log(resultado.rows);
}

module.exports={
  RegistProducto,
  ListaProducto,
  BuscaProducto,
  ModfProducto,
  BorrarProducto
}

