const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');
const path = require('path');

const URL = `/naldeportivo`;

// MODELS
require('./models/models')(wagner);

const cliente = require('./router/cliente.router.js')(wagner);
const producto = require('./router/producto.router.js')(wagner);

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


// ROUTERS

const cli = `/clientes/v1/`;
const pro = `/productos/v1/`;

app.use(cli+'cliente', cliente);
app.use(pro+'producto', producto);

module.exports = app;