import fs from 'fs'; 

class ProductManager {
    #products;
    #path;
    static idProducto = 0;

    constructor(){
        this.#path = './src/data/productos.json';
        this.#products = this.#leerProductosInFile();
    }

    #asignarIdProduct(){
        let id=1;
        if(this.#products.length != 0)
        id = this.#products[this.#products.length-1].id + 1;
        return id;
    }

    #leerProductosInFile(){
        try{
            if(fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, `utf-8`));

            return [];
        } catch(error) {
            console.log(`Ocurrió un error al momento de leer el archivo de productos ${error}`);
        }
    }

    #guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch(error) {
            console.log(`Ocurrió un error al momento de guardar el archivo de productos ${error}`);
        }
    }

addProduct(title, description, code, price, stock, status = true, category, thumbnails = []){

        if(!title || !description || !code || !price || !status || !stock || !category)
            return `Todos los parametros son requeridos [title,description,code,price,stock,category]` 

        const codeRepetido =  this.#products.some(p => p.code == code);
        if(codeRepetido)
            return `El código ${code} ya se encuentra registrado en otro producto`;

        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = this.#asignarIdProduct();
        
        const nuevoProducto = {
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        };
        this.#products.push(nuevoProducto);
        this.#guardarArchivo();

        return `Producto agregado exitosamente con el id ${id}`;
    }

    getProducts(limit = 0){
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0, limit);
        return this.#products;
    }

    getProductById(id){
        let status = false;
        let resp = `El producto con id ${id} no existe`

        id = Number(id);
        const producto = this.#products.find(p => p.id === id);
        if(producto){
            status=true;
            resp=producto
        }
        return{status, resp}
    }

    updateProduct(id, objetUpdate){
        let result = `El producto con ${id} no existe`

        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            const {id, ...rest} = objetUpdate;
            const propPermitidas = ["title","description","code","price","status","stock","category","thumbnails"];
            const propActualizadas = Object.keys(rest)
            .filter(prop => propPermitidas.includes(prop))
            .reduce((obj,key)=>{
                obj[key]=rest[key];
                return obj;
            }, {});
            this.#products[index] = {...this.#products[index], ...propActualizadas}
            this.#guardarArchivo();
            result = {
                msg:`Producto actualizado`,
                producto:this.#products[index]
            }
        }

        return result
    }

    deleteProduct(id){
        let msg = `El producto con ${id} no existe`
        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p => p.id !== id);
            this.#guardarArchivo();
            msg = `Producto eliminado`
        }

        return msg;
    }
}

export default ProductManager;