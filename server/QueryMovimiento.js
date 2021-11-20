const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});


const BuscaMovimiento = async (req,res)=>{
  const { columna, idmovimiento } = req;
  const respuesta = await pool.query('SELECT * FROM movimiento WHERE '+columna+' = $1', [idmovimiento]);
  console.log(respuesta.rows);
}
  
const ListaMovimiento = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM movimiento');
  console.log(respuesta.rows);
}

const RegistMovimiento = async (req, res)=>{
  try{
    const { idcuenta, fecha_moviemiento, mov } =req;
    const respuesta = await pool.query('INSERT INTO movimiento (idcuenta, fecha_moviemiento, mov) VALUES ($1, $2, $3)',
      [idcuenta, fecha_moviemiento, mov]);
    console.log(respuesta.rows);
  }catch(e){console.log(e)}
}

const BorrarMovimiento = async (req, res)=>{
  const { idmovimiento } =req;
  const respuesta = await pool.query('DELETE FROM movimiento WHERE idmovimiento = $1', [idmovimiento]);
  console.log(respuesta.rows);
}

const ModfMovimiento = async (req, res) =>{
  const { idmovimiento, idcuenta, fecha_movimiento, mov } =req.body;
  const resultado = await pool.query('UPDATE movimiento SET '+
  'idcuenta = $2, '+
  'fecha_movimiento = $3, '+
  'mov = $4 '+
  'WHERE id = $1', [idmovimiento, idcuenta, fecha_movimiento, mov]);
  console.log(resultado.rows);
}

module.exports={
  BuscaMovimiento,
  ListaMovimiento,
  RegistMovimiento,
  BorrarMovimiento,
}
