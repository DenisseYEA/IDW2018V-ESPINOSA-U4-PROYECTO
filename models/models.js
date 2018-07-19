const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/Ventas', {
    useMongoClient: true
  });

  wagner.factory('db', () => mongoose);
  const Cliente = require('./cliente.model');
  const Producto = require('./producto.model');

  const models = {
    Cliente,
    Producto
  };

  _.each(models, (v, k) => {
    wagner.factory(k, () => v);
  });
}