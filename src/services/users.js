// import { UsuariosManagerMongo } from '../dao/usuariosManagerMONGO.js';
// import { generaHash } from '../utils.js';

// const usuariosManager = new UsuariosManagerMongo();

// export const createUserService = async (userData) => {
//     try {
//         userData.password = generaHash(userData.password);
//         const nuevoUsuario = await usuariosManager.create(userData);
//         return nuevoUsuario;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getUserByEmailService = async (email) => {
//     try {
//         const usuario = await usuariosManager.getBy({ email });
//         return usuario;
//     } catch (error) {
//         throw error;
//     }
// };

// export const createUserWithGitHubService = async (profile) => {
//     try {
//         const { email, name: nombre } = profile._json;
//         if (!nombre || !email) {
//             throw new Error('Nombre o email no proporcionados por GitHub');
//         }

//         let usuario = await usuariosManager.getBy({ email });
//         if (!usuario) {
//             const nuevoCarrito = await createCartService();
//             usuario = await usuariosManager.create({
//                 nombre, email, profile, carrito: nuevoCarrito._id
//             });
//         }

//         return usuario;
//     } catch (error) {
//         throw error;
//     }
// };

