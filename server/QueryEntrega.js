const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaEntrega = async (req,res)=>{
  const { columna, idventa } = req;
  const respuesta = await pool.query('SELECT * FROM entrega WHERE '+columna+' = $1', [idventa]);
  console.log(respuesta.rows);
}
  
const ListaEntrega = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM entrega');
  console.log(respuesta.rows);
}

const RegistEntrega = async (req, res)=>{
  const { idventa, fecha_ent, hora_ent, referencia } =req;
  const respuesta = await pool.query('INSERT INTO entrega (idventa, fecha_ent, hora_ent, referencia) VALUES ($1, $2, $3, $4)',
    [idventa, fecha_ent, hora_ent, referencia]);
  console.log(respuesta.rows);
}

const BorrarEntrega = async (req, res)=>{
  const { identrega } =req;
  const respuesta = await pool.query('DELETE FROM entrega WHERE identrega = $1', [identrega]);
  console.log(respuesta.rows);
}

const ModfEntrega = async (req, res) =>{
  const { identrega, idventa, fecha_ent, hora_ent, referencia } =req;
  const resultado = await pool.query('UPDATE entrega SET '+
  'idventa = $2, '+
  'fecha_ent = $3, '+
  'hora_ent = $4, '+
  'referencia = $5 '+
  'WHERE identrega = $1', [identrega, idventa, fecha_ent, hora_ent, referencia]);
  console.log(resultado.rows);
}

module.exports={
  RegistEntrega,
  ListaEntrega,
  BuscaEntrega,
  ModfEntrega,
  BorrarEntrega
}

