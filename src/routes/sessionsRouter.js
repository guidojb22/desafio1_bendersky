import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/usuariosManagerMONGO.js';
import passport from 'passport';
import UserGithubDTO from '../dao/DTO/userGitHubDTO.js';
import { loggerDesarrollo } from '../utils.js';

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
    req.session.usuario=usuario;
    req.session.carrito = usuario.carrito;
    
    res.setHeader('Content.Type','application/json');
    res.redirect('/products');
});

router.get("/github", passport.authenticate("github", {}),(req,res)=>{

});

router.get("/callbackGitHub", passport.authenticate("github", {failureRedirect:"/api/sessions/error"}),(req,res)=>{
    req.session.usuario = new UserGithubDTO(req.user);
    req.session.carrito = req.session.usuario.cart;
    
    res.setHeader('Content.Type','application/json');
    res.redirect('/products');
});

router.get('/logout',(req,res)=>{
    req.session.destroy(e=>{
        if(e){
            loggerDesarrollo.error(error)
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