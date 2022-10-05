const express = require("express");
const { adminCheck } = require("./middleware/adminCheck.js");
const { Router } = express;

const router = Router();
const productsDB = './db/products.json';
const { ProdCont } = require('./productsCont.js');

const products = new ProdCont(productsDB)


// -----------------------------
// ---------* Rutas *-----------
/*
 Te dejo separados los archivos en carpetas asi te empezas a organizar.
 tenes varias formas de hacerlo, por ahora vamos a trabajar con MVC
 a mi particularmente me gusta trabajar con modulos. 
 Es decir una carpeta modules en donde habria una carpeta para cart y una products, en este caso, y dentro de cada 
 una de ellas van a tener, en archivos separados, las rutas, los controladores y demas archivos que aun no vimos. 
 Entonces en un misma carpeta tenes todos los archivos juntos y no tenes que estar buscando, cuando los proyectos 
 se tornan grandes, es una muy buena arquitectura. Te comento para que tengas en cuenta a futuro.

 Por ahora te animo a que separes las rutas y las funciones. Te dejo un ejemplo en routes/cartRoutes.js y controller/cartController.js
 -----------------------------
*/
router.get('/:id', (req, res) => {
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