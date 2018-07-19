const router = require('express').Router();

module.exports = (wagner) => {

    const productoCtrl = wagner.invoke((Producto) =>
        require('../controllers/producto.controller')(Producto));

    router.get('/', (req, res) =>
        productoCtrl.getAll(req, res));

    router.get('/:id', (req, res) =>
        productoCtrl.getById(req, res));

    router.delete('/:id', (req, res) =>
        productoCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        productoCtrl.createProducto(req, res));

    router.put('/:id', (req, res) =>
        productoCtrl.updateById(req, res));

    return router;
}