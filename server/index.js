const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(express.json()); //req.body

//rutas
const {ListaUsuarios, RegistUsiario, BuscaUsuario, BorrarUsuario} = require('./QuerysUsuario');
const {ListaMovimiento, RegistMovimiento, BuscaMovimiento, BorrarMovimiento} = require('./QueryMovimiento');
const {RegistCliente, ListaCliente, BuscaCliente, ModfCliente, BorrarCliente} = require('./QueryCliente');
const {RegistVenta, ListaVenta, BuscaVenta, ModfVenta, BorrarVenta} = require('./QueryVenta');
const {RegistEntrega, ListaEntrega, BuscaEntrega, ModfEntrega, BorrarEntrega } = require('./QueryEntrega');
const {RegistAbono, ListaAbono, BuscaAbono, ModfAbono, BorrarAbono} = require('./QueryAbono');
const {RegistProveedor, ListaProveedor, BuscaProveedor, ModfProveedor, BorrarProveedor} = require('./QueryProveedor');
const {RegistProvProd, ListaProvProd, BuscaProvProd, ModfProvProd, BorrarProvProd} = require('./QueryProv_Prod');
const {RegistProducto, ListaProducto, BuscaProducto, ModfProducto, BorrarProducto} = require('./QueryProducto');
const {RegistProdVent, ListaProdVent, BuscaProdVent, ModfProdVent, BorrarProdVent} = require('./QueryProd_Venta');




app.listen(5000, () => {
    console.log("server has started on port 5000");
});

// const tipo_usuario = 'Admin';
// const nombre_usuario = 'Edith';
// const apaterno = 'Gonzalez';
// const amaterno = 'Valliere';
// const contra = '123456';
// const email = 'edith@gg.mx';
// const pregunta = 'magia?';
// const respuesta = 'si';
// RegistUsiario({tipo_usuario, nombre_usuario, apaterno, amaterno, contra, email, pregunta, pregunta, respuesta});

// ListaUsuarios();

// const columna = "idcuenta";
// const valor= "3";
// BuscaUsuario({columna, valor});

// const correo = "carlos@gg.mx";
// BorrarUsuario({correo});

/*------------------------------------------------------------------------------------------*/
//ListaMovimiento();

// const idcuenta = 3;
// const fecha_moviemiento = new Date().toISOString().slice(0, 16).replace("T", " ");
// const mov = 'Nose que va aqui xdxd';
// RegistMovimiento({idcuenta, fecha_moviemiento, mov});

// const idmovimiento = 2;
// const columna = 'idmovimiento';
// BuscaMovimiento({columna, idmovimiento});

// const idmovimiento = 2;
// BorrarMovimiento({idmovimiento});
/*------------------------------------------------------------------------------------------*/

// const nombre_cliente = 'Carlos';
// const apaterno = 'López';
// const amaterno = 'Palma';
// const direccion = 'TlaxoGod Toluca';
// const telefono = '7227844903';
// RegistCliente({nombre_cliente,apaterno,amaterno,direccion,telefono});

// ListaCliente();

// const idcliente = 1;
// const columna = 'idcliente';
// BuscaCliente({columna, idcliente});

// const idcliente = 1;
// const nombre_cliente = 'Carlos';
// const apaterno = 'Lopez';
// const amaterno = 'Palma';
// const direccion = 'TlaxoGod Toluca 103';
// const telefono = '700998803';
// ModfCliente({idcliente, nombre_cliente, apaterno, amaterno, direccion, telefono});

// const idcliente = 1;
// BorrarCliente({idcliente});
/*------------------------------------------------------------------------------------------*/

// const idcuenta = 3;
// const idcliente = 2;
// const fecha_venta = new Date().toISOString().slice(0, 16).replace("T", " ");
// const estatus = 'pagando';
// const total = 17800.50;
// RegistVenta({idcuenta, idcliente, fecha_venta, estatus, total});

//ListaVenta();

// const idventa = 2;
// const columna = 'idventa';
// BuscaVenta({columna, idventa});

// const idventa = 2;
// const idcuenta = 3;
// const idcliente = 2;
// const fecha_venta = new Date().toISOString().slice(0, 16).replace("T", " ");
// const estatus = 'pagado';
// const total = 580.90;
// ModfVenta({idventa, idcuenta, idcliente, fecha_venta, estatus, total});

// const idventa = 2;
// BorrarVenta({idventa});
/*------------------------------------------------------------------------------------------*/
// const idventa = 3;
// let date = new Date();
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// const fecha_ent = day+"/"+month+"/"+year;
// const hora_ent = "12:30:55";
// const referencia = "Si le sabe al chipotle";
// RegistEntrega({idventa, fecha_ent, hora_ent, referencia});

// ListaEntrega();

// const idventa = 1;
// const columna = 'identrega';
// BuscaEntrega({columna, idventa});

// const identrega = 1;
// const idventa = 3;
// let date = new Date();
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// const fecha_ent = day+"/"+month+"/"+year;
// const hora_ent = "13:30:55";
// const referencia = "Si le sabe bandamaxxx";
// ModfEntrega({identrega, idventa, fecha_ent, hora_ent, referencia});

// const identrega = 1;
// BorrarEntrega({identrega});
/*------------------------------------------------------------------------------------------*/

// const idventa = 3;
// const cant_abonada = 300.50;
// const fecha_abono = new Date().toISOString().slice(0, 16).replace("T", " ");
// RegistAbono({idventa,cant_abonada,fecha_abono });

// ListaAbono();

// const idabono = 1;
// const columna = 'idabono';
// BuscaAbono({columna,idabono});

// const idabono = 1;
// const idventa = 3;
// const cant_abonada = 200.10;
// const fecha_abono = new Date().toISOString().slice(0, 16).replace("T", " ")
// ModfAbono({idabono, idventa, cant_abonada, fecha_abono});

// const idabono = 1;
// BorrarAbono({idabono});
/*------------------------------------------------------------------------------------------*/

// const nombre_empresa = "bimbo";
// const direccion = 'avenida del infiero';
// const email = 'bimbo22@gg.mx';
// const telefono = '1111122345';
// RegistProveedor({nombre_empresa, direccion, email, telefono});

// const idprov = 1;
// ModfProveedor({idprov, nombre_empresa, direccion, email, telefono});

// ListaProveedor();

// const idprov = 1;
// const columna = 'idprov';
// BuscaProveedor({columna, idprov});

// BorrarProveedor({idprov});

/*------------------------------------------------------------------------------------------*/
// const idprov = 2;
// const tipo = 'comedores';
// RegistProvProd({idprov, tipo});

// const idmercancia = 1;
// ModfProvProd({idmercancia, idprov, tipo});

// ListaProvProd();

// const idmercancia = 1;
// const columna = 'idmercancia';
// BuscaProvProd({columna, idmercancia});

// BorrarProvProd({idmercancia});

/*------------------------------------------------------------------------------------------*/

// const idmercancia = 2;
// const marca = "COCACOLA";
// const modelo = "ROSA";
// const nombre_producto = "SILLÓN VERDE";
// const precio = 19600.66;
// const existencia = 35;
// RegistProducto({idmercancia, marca, modelo, nombre_producto, precio, existencia});

// const idprod = 1;
// ModfProducto({idprod, idmercancia, marca, modelo, nombre_producto, precio, existencia});

// ListaProducto();

// const columna = 'idprod';
// BuscaProducto({columna, idprod});

// BorrarProducto({idprod});

/*------------------------------------------------------------------------------------------*/
const idprod = 2;
const idventa = 3;
const cantidad = 2;
const subtotal = 9000.99;
RegistProdVent({idprod, idventa, cantidad, subtotal});

// const idprodv = 1;
// ModfProdVent({idprodv, idprod, idventa, cantidad, subtotal});

// ListaProdVent();

// const columna = "idprodv";
// BuscaProdVent({columna, idprodv});

// BorrarProdVent({idprodv});