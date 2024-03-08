const ProductManager = require("./productManager");

const producto = new ProductManager();

console.log (producto.addProduct(`Laptop`,`lenovo30`, 50000, `https://img01,com`, `s432sdff`, 22));
console.log (producto.addProduct(`Laptop`,`lenovo230`, 520000, `https://img01,com`, `s4332sdff`, 222));

console.log(producto.getProducts());
// console.log(producto.getProductById(1));