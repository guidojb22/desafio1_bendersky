export default class UserGithubDTO {
    constructor(usuario){
        this.firstName = usuario.nombre;
        this.lastName = usuario.apellido;
        this.fullName = usuario.apellido?`${this.firstName} ${this.lastName}`:null;
        this.email = usuario.email
        this.age = usuario.edad
        this.password = usuario.password
        this.carrito = usuario.carrito
        this.rol = "user"
    }
}
