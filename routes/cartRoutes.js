// const express = require("express")
// const { Router } = express;
// const router = Router();

// Te dejo un tip por si te sirve.
// Si se que solo voy a utilizar expres para invocar a Router(), lo hago en una linea
const router = require('express').Router()

const { createCart } = require('../controller/cartController');


router.post('/', createCart )
// Si qrs aplicar un middleware, seria asi ====> router.post('/', adminCheck , createCart )


/*
    -----------------------------------
    te dejo para que reniegues jaja pasa el resto de las funciones al archivo controller. Y las de product tambien.
    presta atencion a las expotaciones e importaciones.
    En lo que te pueda dar una mano, no dudes en escribir!
    -----------------------------------
*/


// router.delete('/:id', (req, res) => {
//     // * vacia un carrito y lo elimina
//     const { id } = req.params;
//     const success = carts.deleteCartbyID(id);
//     res.send({success})
// })

// router.get('/:id/productos', (req, res) => {
//     // * lista los productos guardados en el cart
//     const { id } = req.params;

//     const products = carts.getCartProductsByID(id)
//     res.send(products)
// })

// router.post('/:id/productos', (req, res) => {
//     // * agrega un producto al carrito por id del producto
//     const { id } = req.params;
//     const { id: id_prod, timestamp, title, description, barcode, thumbnail, price, stock } = req.body;

//     const producto = {
//         id: id_prod,
//         timestamp: Date.now(),
//         title: title,
//         description: description,
//         barcode: barcode,
//         thumbnail: thumbnail,
//         price: price,
//         stock: stock
//     }

//     carts.addProductToCart(id, producto)
//     res.send({message: 'Producto agregado'})

// })

// router.delete('/:id/productos/:id_prod', (req, res) => {
//     // * elimina un producto por su id de un carrito
//     const { id, id_prod } = req.params;

//     const result = carts.deleteProductfromCart(id, id_prod);
//     res.send({message: result})
// })


module.exports = router;