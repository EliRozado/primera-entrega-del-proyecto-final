// Archivo de file system actions
const fs = require("fs")

class CartCont {
    constructor(ruta){
        this.archivo = ruta
    }

    save(cart){
        const newCart = cart

        const data = this.processData()
        
        if(data.length){
            //si hay carts en data, buscar el ultimo id
            const last_id = data[data.length - 1].id
            newCart.id = last_id + 1
        }else{
            //si es el primer cart de la lista, id = 1
            newCart.id = 1
        }

        newCart.timestamp = Date.now();

        data.push(newCart)
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))

        return newCart.id
    }

    deleteCartbyID(numero){
        const data = this.processData()
        let cartIndex = data.findIndex(cart => cart.id == numero)

        if(cartIndex >= 0){
            data.splice(cartIndex, 1)

            fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
            return 'El carrito fue eliminado';
        }else{
            return 'No hay carrito con ese id';
        }
    }

    getCartProductsByID(numero){
        const data = this.processData()
        let cart = data.find(cart => cart.id == numero) || null;
        
        if(cart != null){
            return cart.products;
        }else{
            return 'No hay carrito con ese id'
        }
    }

    addProductToCart(id_cart, product){
        const data = this.processData();

        let cartIndex = data.findIndex(cart => cart.id == id_cart);

        data[cartIndex].products.push(product);
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
            
        return 'Producto agregado';
    }

    deleteProductfromCart(id_cart, id_prod){
        const data = this.processData();

        let cartIndex = data.findIndex(cart => cart.id == id_cart);
        if(cartIndex >= 0){
            let prodIndex = data[cartIndex].products.findIndex(product => product.id == id_prod);

            if(prodIndex >= 0){
                data[cartIndex].products.splice(prodIndex, 1)

                fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
                return 'El producto fue eliminado';
            }else{
                return 'El producto buscado no esta en la lista';
            }
        }else{
            return 'El carrito no existe';
        }
    }

    processData(){
        const data = []
        // * Si ya hay algo en el archivo, pasarlo a data
        try{
            const productos = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            productos.forEach(element => {
                data.push(element)
            });
            
        } catch(err) {
            console.log('El archivo estaba vacio')
        }

        return data
    }
}

module.exports.CartCont = CartCont;
