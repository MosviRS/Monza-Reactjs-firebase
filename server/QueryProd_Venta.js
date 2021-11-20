const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaProdVent = async (req,res)=>{
  const { columna, idprodv } = req;
  const respuesta = await pool.query('SELECT * FROM prod_venta WHERE '+columna+' = $1', [idprodv]);
  console.log(respuesta.rows);
}
  
const ListaProdVent = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM prod_venta');
  console.log(respuesta.rows);
}

const RegistProdVent = async (req, res)=>{
  const { idprod, idventa, cantidad, subtotal } =req;
  const respuesta = await pool.query('INSERT INTO prod_venta (idprod, idventa, cantidad, subtotal) '+
   'VALUES ($1, $2, $3, $4)',
    [idprod, idventa, cantidad, subtotal]);
  console.log(respuesta.rows);
}

const BorrarProdVent = async (req, res)=>{
  const { idprodv } =req;
  const respuesta = await pool.query('DELETE FROM prod_venta WHERE idprodv = $1', [idprodv]);
  console.log(respuesta.rows);
}

const ModfProdVent = async (req, res) =>{
  const { idprodv, idprod, idventa, cantidad, subtotal  } =req;
  const resultado = await pool.query('UPDATE prod_venta SET '+
  'idprod = $2, '+
  'idventa = $3, '+
  'cantidad = $4, '+
  'subtotal = $5 '+
  'WHERE idprodv = $1', [idprodv, idprod, idventa, cantidad, subtotal]);
  console.log(resultado.rows);
}

module.exports={
  RegistProdVent,
  ListaProdVent,
  BuscaProdVent,
  ModfProdVent,
  BorrarProdVent
}

