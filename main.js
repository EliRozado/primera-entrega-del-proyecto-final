const express = require('express');
const cartRouter = require('./cart.js');
const prodRouter = require('./products.js');

const app = express();
const port = process.env.Port || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/carrito', cartRouter)
app.use('/api/productos', prodRouter)

app.listen(port, () => {
    console.log(`conectado por ${port}`)
})