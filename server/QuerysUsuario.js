const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'monzaBD',
  port: '5432'
});


const BuscaUsuario = async (req,res)=>{
  const { columna, valor } = req;
  const respuesta = await pool.query('SELECT * FROM usuario WHERE '+columna+' = $1', [valor]);
  console.log(respuesta.rows);
}
  
const ListaUsuarios = async (req,res)=>{
  const respuesta = await pool.query('SELECT * FROM usuario');
  console.log(respuesta.rows);
}

const RegistUsiario = async (req, res)=>{
  const {tipo_usuario, nombre_usuario, apaterno, amaterno, contra, email, pregunta, respuesta } = req;
  try{
    const resultado = await pool.query('INSERT INTO usuario (tipo_usuario, nombre_usuario, apaterno, amaterno, contra, email, '+
    'pregunta, respuesta) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [tipo_usuario, nombre_usuario, apaterno, amaterno, contra, email, pregunta, respuesta]);
      console.log('Usuario registrado '+resultado);
  }catch(e){
    console.log(e);
  }
}

const BorrarUsuario = async (req, res)=>{
  const { correo } = req;
  const respuesta = await pool.query('DELETE FROM usuario WHERE email = $1', [correo]);
  console.log(respuesta.rows);
}

module.exports={
  BuscaUsuario,
  ListaUsuarios,
  RegistUsiario,
  BorrarUsuario,
}
