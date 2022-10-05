const { CartCont } = require('../cartCont.js')
const cartDB = '../db/carts.json'
const carts = new CartCont(cartDB)

const createCart= (req, res) => {
    // * crea un carrito y devuelve su id
    const newCart = {
        products: []
    }
    const id = carts.save(newCart);

    res.send({id});
}

module.exports={ createCart }