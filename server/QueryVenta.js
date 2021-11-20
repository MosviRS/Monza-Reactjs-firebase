const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaVenta = async (req,res)=>{
  const { columna, idventa } = req;
  const respuesta = await pool.query('SELECT * FROM venta WHERE '+columna+' = $1', [idventa]);
  console.log(respuesta.rows);
}
  
const ListaVenta = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM venta');
  console.log(respuesta.rows);
}

const RegistVenta = async (req, res)=>{
  const { idcuenta, idcliente, fecha_venta, estatus, total } =req;
  const respuesta = await pool.query('INSERT INTO venta (idcuenta, idcliente, fecha_venta, estatus, total) VALUES ($1, $2, $3, $4, $5)',
    [idcuenta, idcliente, fecha_venta, estatus, total]);
  console.log(respuesta.rows);
}

const BorrarVenta = async (req, res)=>{
  const { idventa } =req;
  const respuesta = await pool.query('DELETE FROM venta WHERE idventa = $1', [idventa]);
  console.log(respuesta.rows);
}

const ModfVenta = async (req, res) =>{
  const { idventa, idcuenta, idcliente, fecha_venta, estatus, total } =req;
  const resultado = await pool.query('UPDATE venta SET '+
  'idcuenta = $2, '+
  'idcliente = $3, '+
  'fecha_venta = $4, '+
  'estatus = $5, '+
  'total = $6 '+
  'WHERE idventa = $1', [idventa, idcuenta, idcliente, fecha_venta, estatus, total]);
  console.log(resultado.rows);
}

module.exports={
  RegistVenta,
  ListaVenta,
  BuscaVenta,
  ModfVenta,
  BorrarVenta
}

