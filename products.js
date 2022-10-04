const express = require("express")
const { Router } = express;

const router = Router();
const productsDB = './db/products.json';
const { ProdCont } = require('./productsCont.js');

const products = new ProdCont(productsDB)

const isAdmin = false;

// * middleware 
function adminCheck(req, res, next){
    if(isAdmin){
        next()
    }else(
        res.send({error: -1, mensaje: `método no autorizado para usuarios`})
    )
}

// -----------------------------
// ---------* Rutas *-----------
// -----------------------------
router.get('/:id?', (req, res) => {
    // * devuelve todos los productos o lista un producto por su id
    if(req.params.id){
        const {id} = req.params;
        res.send(products.getByID(id))
    }else{
        res.send(products.getAll())
    }
})

router.post('/', adminCheck, (req, res) => {
    // * incorpora un producto a la lista
    const { title, description, barcode, thumbnail, price, stock } = req.body;

    const producto = {
        title: title,
        description: description,
        barcode: barcode,
        thumbnail: thumbnail,
        price: price,
        stock: stock
    }

    products.save(producto)
    res.send(products.getAll())
})

router.put('/:id', adminCheck, (req,res) => {
    // * actualiza un producto por su id
    const { id } = req.params;
    const { title, description, barcode, thumbnail, price, stock } = req.body;

    const producto = {
        title: title,
        description: description,
        barcode: barcode,
        thumbnail: thumbnail,
        price: price,
        stock: stock
    }

    products.editByID(id, producto)

    res.send(products.getAll())
})

router.delete('/:id', adminCheck, (req,res) => {
    // * borra un producto por su id
    const { id } = req.params;
    let result = products.deleteByID(id); // nos dice si el producto fue eliminado o no estaba en la lista
    res.send({result})
})

module.exports = router;