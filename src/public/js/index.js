const socket = io();

socket.on('productos', productos => {
    const tbody = document.getElementById('productos-body');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const row = tbody.insertRow();
        
        row.innerHTML=`
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.code}</td>
        <td>${producto.price}</td>
        <td>${producto.status ? 'Activo' : 'Desactivado'}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.thumbnails}</td>        
        `;
    });
});

const formulario = document.getElementById('producto-form');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const codigo = document.getElementById('codigo').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const categoria = document.getElementById('categoria').value;

    const producto = {
        title: titulo,
        description: descripcion,
        code: codigo,
        price: precio,
        stock: stock,
        category: categoria
    }

    socket.emit('agregarProducto', producto);
    formulario.reset();
});