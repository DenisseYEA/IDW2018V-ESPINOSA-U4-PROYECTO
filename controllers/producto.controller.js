const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _producto;

const getAll = (req, res) => {
    _producto.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'productos', res));
};

const getById = (req, res) => {
    const { id } = req.params;

    console.log(id.toString().length);

    if (id.toString().length != 24) {
        res.status(status.BAD_REQUEST);
        res.json({ err: "Identificador Inválido" });
    }

    else {
        _producto.find({ _id: id })
            .sort({})
            .exec(handler.handleOne.bind(null, 'producto', res));
    }
};


const deleteById = (req, res) => {
    const id = req.params.id;

    _producto.remove({_id:id},(err,data)=>{
        if(err){
                res.status(400);
                res.json({msg:"No se pudo realizar la operación, intente nuevamente"})
        }else{
            res.status(200);
            res.json({msg:"El producto se eliminó correctamente"});
        }
    });    
};

const createProducto = (req, res) => {
    const producto = req.body;

    _producto.create(producto)
        .then(
            (data) => {
                res.status(200);
                res.json({msg:"Producto creado correctamente",data:data});
            }
        )
        .catch(
            (err) => {
                res.status(400);
                res.json({msg:"Algo va mal!!!",data:err});
            }
        )
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = {_id:id};

    _producto.findOneAndUpdate(query,newData,(err,data)=>{
        if(err){
                res.status(400);
                res.json({msg:"No se pudo realizar la operación, intente nuevamente"})
        }else{
            res.status(200);
            res.json({msg:"Producto se modificó correctamente"});
        }
    });
};

module.exports = (Producto) => {
    _producto = Producto;
    return ({
        getAll,
        getById,
        deleteById,
        createProducto,
        updateById
    });
}