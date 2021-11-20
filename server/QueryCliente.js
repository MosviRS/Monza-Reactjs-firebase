const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const RegistCliente = async (req, res)=>{
  try{
    const { nombre_cliente, apaterno, amaterno, direccion, telefono } =req;
    const respuesta = await pool.query('INSERT INTO cliente (nombre_cliente, apaterno, amaterno, direccion, telefono) VALUES ($1, $2, $3, $4, $5)',
      [nombre_cliente, apaterno, amaterno, direccion, telefono]);
    console.log(respuesta.rows);
  }catch(e){console.log(e)}
}

const ListaCliente = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM cliente');
  console.log(respuesta.rows);
}

const BuscaCliente = async (req,res)=>{
  const { columna, idcliente } = req;
  const respuesta = await pool.query('SELECT * FROM cliente WHERE '+columna+' = $1', [idcliente]);
  console.log(respuesta.rows);
}

const ModfCliente = async (req, res) =>{
  const { idcliente, nombre_cliente, apaterno, amaterno, direccion, telefono } =req;
  const resultado = await pool.query('UPDATE cliente SET '+
  'nombre_cliente = $2, '+
  'apaterno = $3, '+
  'amaterno = $4, '+
  'direccion = $5, '+
  'telefono = $6 '+
  'WHERE idcliente = $1', [idcliente, nombre_cliente, apaterno, amaterno, direccion, telefono]);
  console.log(resultado.rows);
}

const BorrarCliente = async (req, res)=>{
  const { idcliente } =req;
  const respuesta = await pool.query('DELETE FROM cliente WHERE idcliente = $1', [idcliente]);
  console.log(respuesta.rows);
}

module.exports={
  RegistCliente,
  ListaCliente,
  BuscaCliente,
  ModfCliente,
  BorrarCliente
}