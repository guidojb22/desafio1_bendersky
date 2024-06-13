import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/usuariosManagerMONGO.js';
import passport from 'passport';

export const router=Router();

const usuariosManager = new UsuariosManagerMongo()

router.get("/error", (req,res)=>{
    res.setHeader('Content.Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor`,
            detalle:`Fallo al autenticar`
        }
    )
});

router.post('/registro', passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}), async(req,res)=>{
    res.redirect('/login');
});

router.post('/login',passport.authenticate("login", {failureRedirect:"/api/sessions/error"}) ,async(req,res)=>{

    let usuario={...req.user}
    delete usuario.password
    req.session.usuario=usuario
    
    res.setHeader('Content.Type','application/json');
    res.redirect('/products');
});

router.get("/github", passport.authenticate("github", {}),(req,res)=>{

});

router.get("/callbackGitHub", passport.authenticate("github", {failureRedirect:"/api/sessions/error"}),(req,res)=>{
    req.session.usuario = req.user
    
    res.setHeader('Content.Type','application/json');
    res.redirect('/products');
});

router.get('/logout',(req,res)=>{
    req.session.destroy(e=>{
        if(e){
            console.log(error)
            res.setHeader('Content.Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor`,
                    detalle:`${error.message}`
                }
            )
        }
    })

    res.setHeader('Content.Type','application/json');
    res.redirect('/login');
});

// import { Router } from 'express';
// import passport from 'passport';
// import { registerUserController, loginUserController } from '../controllers/users.js';

// export const router = Router();

// router.get("/error", (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     return res.status(500).json({
//         error: 'Error inesperado en el servidor',
//         detalle: 'Fallo al autenticar'
//     });
// });
// router.post('/registro', passport.authenticate("registro", { failureRedirect: "/api/sessions/error" }), registerUserController);
// router.post('/login', passport.authenticate("login", { failureRedirect: "/api/sessions/error" }), loginUserController);
// router.get("/github", passport.authenticate("github", {}));
// router.get("/callbackGitHub", passport.authenticate("github", { failureRedirect: "/api/sessions/error" }), (req, res) => {
//     req.session.usuario = req.user;
//     res.setHeader('Content-Type', 'application/json');
//     res.redirect('/products');
// });
// router.get('/logout', (req, res) => {
//     req.session.destroy(error => {
//         if (error) {
//             console.log(error);
//             res.setHeader('Content-Type', 'application/json');
//             return res.status(500).json({
//                 error: 'Error inesperado en el servidor',
//                 detalle: `${error.message}`
//             });
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.redirect('/login');
//     });
// });