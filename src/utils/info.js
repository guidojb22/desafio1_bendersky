export const generateProductErrorInfo = (product) => {
    return `Una o más propiedades están incompletas o no son válidas. Lista de requerimientos:
    - title: Debe ser un string. Se recibió ${product.title} 
    - description: Debe ser un string. Se recibió ${product.description}
    - code: Debe ser un number. Se recibió ${product.code}
    - price: Debe ser un number. Se recibió ${product.price}
    - stock: Debe ser un number. Se recibió ${product.stock}
    - category: Debe ser un string. Se recibió ${product.category}`
}