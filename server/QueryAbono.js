const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});

const BuscaAbono = async (req,res)=>{
  const { columna, idabono } = req;
  const respuesta = await pool.query('SELECT * FROM abono WHERE '+columna+' = $1', [idabono]);
  console.log(respuesta.rows);
}
  
const ListaAbono = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM abono');
  console.log(respuesta.rows);
}

const RegistAbono = async (req, res)=>{
  const { idventa, cant_abonada, fecha_abono } =req;
  const respuesta = await pool.query('INSERT INTO abono (idventa, cant_abonada, fecha_abono) VALUES ($1, $2, $3)',
    [idventa, cant_abonada, fecha_abono]);
  console.log(respuesta.rows);
}

const BorrarAbono = async (req, res)=>{
  const { idabono } =req;
  const respuesta = await pool.query('DELETE FROM abono WHERE idabono = $1', [idabono]);
  console.log(respuesta.rows);
}

const ModfAbono = async (req, res) =>{
  const { idabono, idventa, cant_abonada, fecha_abono } =req;
  const resultado = await pool.query('UPDATE abono SET '+
  'idventa = $2, '+
  'cant_abonada = $3, '+
  'fecha_abono = $4 '+
  'WHERE idabono = $1', [idabono, idventa, cant_abonada, fecha_abono]);
  console.log(resultado.rows);
}

module.exports={
  RegistAbono,
  ListaAbono,
  BuscaAbono,
  ModfAbono,
  BorrarAbono
}

