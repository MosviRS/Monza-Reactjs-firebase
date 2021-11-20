const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaProveedor = async (req,res)=>{
  const { columna, idprov } = req;
  const respuesta = await pool.query('SELECT * FROM proveedor WHERE '+columna+' = $1', [idprov]);
  console.log(respuesta.rows);
}
  
const ListaProveedor = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM proveedor');
  console.log(respuesta.rows);
}

const RegistProveedor = async (req, res)=>{
  const { nombre_empresa, direccion, email, telefono } =req;
  const respuesta = await pool.query('INSERT INTO proveedor (nombre_empresa, direccion, email, telefono) VALUES ($1, $2, $3, $4)',
    [nombre_empresa, direccion, email, telefono]);
  console.log(respuesta.rows);
}

const BorrarProveedor = async (req, res)=>{
  const { idprov } =req;
  const respuesta = await pool.query('DELETE FROM proveedor WHERE idprov = $1', [idprov]);
  console.log(respuesta.rows);
}

const ModfProveedor = async (req, res) =>{
  const { idprov, nombre_empresa, direccion, email, telefono } =req;
  const resultado = await pool.query('UPDATE proveedor SET '+
  'nombre_empresa = $2, '+
  'direccion = $3, '+
  'email = $4, '+
  'telefono = $5 '+
  'WHERE idprov = $1', [idprov, nombre_empresa, direccion, email, telefono]);
  console.log(resultado.rows);
}

module.exports={
  RegistProveedor,
  ListaProveedor,
  BuscaProveedor,
  ModfProveedor,
  BorrarProveedor
}

