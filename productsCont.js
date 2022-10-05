// Archivo de file system actions
const fs = require("fs")

class ProdCont {
    constructor(ruta){
        this.archivo = ruta;
    }

    save(producto){
        const producto_a_agregar = producto

        const data = this.processData()
        
        if(data.length){
            //si hay productos en data, buscar el ultimo id
            const last_id = data[data.length - 1].id
            producto_a_agregar.id = last_id + 1
        }else{
            //si es el primer producto de la lista, id = 1
            producto_a_agregar.id = 1
        }

        producto_a_agregar.timestamp = Date.now();

        data.push(producto_a_agregar)
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))

        return producto_a_agregar.id
    }

    editByID(numero, product){
        const data = this.processData();

        let productoIndex = data.findIndex(producto => producto.id == numero);

        if(productoIndex >= 0){
            const { title, description, barcode, thumbnail, price, stock } = product;

            data[productoIndex].timestamp = Date.now();
            // Podemos usar un operador ternario, que es un condicional if, de un linea.
            // Por si solo se actualiza una parte de los datos del producto
            /* 
            Entonces:
            en data[productoIndex].title = 
            vamos a guardar el resultado de un condicional
            Entonces preguntamos si la propiedad tiene algo
            title ?
                asignamos esa propiedad
            title 
                sino, le dejamos la info que tiene
            : data[productoIndex].title ;
            Asi con cada propiedad
            */ 
            data[productoIndex].title = title? title: data[productoIndex].title ;
            data[productoIndex].description = description ? description : data[productoIndex].description;
            data[productoIndex].barcode = barcode? barcode : data[productoIndex].barcode;
            data[productoIndex].thumbnail = thumbnail? thumbnail : data[productoIndex].thumbnail;
            data[productoIndex].price = price? price : data[productoIndex].price;
            data[productoIndex].stock = stock? stock : data[productoIndex].stock;

            fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
            return 'El producto fue editado';
        }else{
            return 'El producto no existe';
        }
    }

    getByID(numero){
        const data = this.processData()

        //si no lo encuentra, devuelve null
        let producto = data.find(producto => producto.id == numero) || null

        return producto
    }

    getAll(){
        const data = this.processData()
        
        if(data.length){
            return data
        }else{
            console.log('No hay nada en la lista')
            return []
        }
    }

    deleteByID(numero){
        const data = this.processData()

        let productoIndex = data.findIndex(producto => producto.id == numero)

        if(productoIndex >= 0){
            data.splice(productoIndex, 1)

            fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
            return 'El producto fue eliminado';
        }else{
            return 'El producto buscado no esta en la lista';
        }
    }

    deleteAll(){
        //Elimina todos los productos del archivo
        const data = []
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
        console.log('Se vacio la lista')
    }

    // * funcion de ayuda
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

module.exports.ProdCont = ProdCont;