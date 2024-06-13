// import { createUserService, getUserByEmailService, createUserWithGitHubService } from '../services/users.js';
// import { generaHash, validaPassword } from '../utils.js';

// export const registerUserController = async (req, res, next) => {
//     try {
//         const { nombre, apellido, email, edad, password } = req.body;
//         if (!nombre || !apellido || !email || !edad || !password) {
//             return res.status(400).json({ error: 'Complete todos los campos requeridos' });
//         }

//         const existingUser = await getUserByEmailService(email);
//         if (existingUser) {
//             return res.status(400).json({ error: `El usuario con email ${email} ya existe` });
//         }

//         password = generaHash(password);

//         const nuevoUsuario = await createUserService({ nombre, apellido, email, edad, password });

//         return res.redirect('/login');

//     } catch (error) {
//         next(error);
//     }
// };

// export const loginUserController = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const usuario = await getUserByEmailService(email);
//         if (!usuario || !validaPassword(password, usuario.password)) {
//             return res.status(400).json({ error: 'Credenciales inválidas' });
//         }

//         let user = { ...usuario };
//         delete user.password;
//         req.session.usuario = user;

//         res.redirect('/products');
//     } catch (error) {
//         console.log('loginUserController --- ', error);
//         return res.status(500).json({msg: 'Hablar con un administrador'});
//     }
// };

// export const githubAuthController = async (profile, done) => {
//     try {
//         const usuario = await createUserWithGitHubService(profile);
//         return done(null, usuario);
//     } catch (error) {
//         return done(error);
//     }
// };
