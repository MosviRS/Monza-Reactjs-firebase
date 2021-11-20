const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaProvProd = async (req,res)=>{
  const { columna, idmercancia } = req;
  const respuesta = await pool.query('SELECT * FROM prov_producto WHERE '+columna+' = $1', [idmercancia]);
  console.log(respuesta.rows);
}
  
const ListaProvProd = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM prov_producto');
  console.log(respuesta.rows);
}

const RegistProvProd = async (req, res)=>{
  const { idprov, tipo } =req;
  const respuesta = await pool.query('INSERT INTO prov_producto (idprov, tipo) VALUES ($1, $2)',
    [idprov, tipo]);
  console.log(respuesta.rows);
}

const BorrarProvProd = async (req, res)=>{
  const { idmercancia } =req;
  const respuesta = await pool.query('DELETE FROM prov_producto WHERE idmercancia = $1', [idmercancia]);
  console.log(respuesta.rows);
}

const ModfProvProd = async (req, res) =>{
  const { idmercancia, idprov, tipo  } =req;
  const resultado = await pool.query('UPDATE prov_producto SET '+
  'idprov = $2, '+
  'tipo = $3 '+
  'WHERE idmercancia = $1', [idmercancia, idprov, tipo]);
  console.log(resultado.rows);
}

module.exports={
  RegistProvProd,
  ListaProvProd,
  BuscaProvProd,
  ModfProvProd,
  BorrarProvProd
}

