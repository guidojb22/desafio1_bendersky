// const ProductManager = require("./productManager");
import ProductManager from "./src/productManager.js";

const producto = new ProductManager();

console.log (producto.addProduct(`Laptop`,`lenovo30`, 50000, `https://img01,com`, `s432sdff`, 22));
console.log (producto.addProduct(`Laptop`,`lenovo230`, 520000, `https://img01,com`, `s4332sdff`, 222));
// console.log (producto.addProduct(`Laptop`,`lenovo23`, 53000, `https://img01,com`, `s4332sdff8`, 23));
// console.log (producto.addProduct(`Laptop`,`lenovo20`, 513000, `https://img01,com`, `s4332sdff9`, 24));


// console.log(producto.getProducts());
// console.log(producto.getProductById(1));

// console.log(producto.deleteProduct(1));

// const productoNuevo = {
//     "id":5,
//     "title":"Laptop",
//     "description":"lenovo40",
//     "price":60000,
//     "thumbnail":"https://img05,com",
//     "code":"s43333sdff",
//     "stock":22
// }

// console.log(producto.updateProduct(4, productoNuevo));