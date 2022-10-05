const express = require('express');
const cartRouter = require('./routes/cartRoutes')
const prodRouter = require('./products');

const app = express();
const port = process.env.Port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/carrito', cartRouter)
app.use('/api/productos', prodRouter)

app.listen(port, () => {
    console.log(`conectado por ${port}`)
})