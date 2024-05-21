import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/usuariosManagerMONGO.js';
import { generaHash, validaPassword } from '../utils.js';
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

//paso3
router.post('/registro', passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}), async(req,res)=>{
    res.redirect('/login');

});

router.post('/login',passport.authenticate("login", {failureRedirect:"/api/sessions/error"}) ,async(req,res)=>{
    let {web}=req.body;

    // if(!email || !password){
    //     // res.setHeader('Content.Type','application/json')
    //     // return res.status(400).json({error:'Complete email y password'})
    //     if(web){
    //         return res.redirect(`/login?error=Credenciales invalidas`)
    //     }else{
    //         res.setHeader('Content.Type','application/json')
    //         return res.status(400).json({error:`Credenciales invalidas`})
    //     }
    // }

    let usuario={...req.user}
    delete usuario.password
    req.session.usuario=usuario
    
    res.setHeader('Content.Type','application/json');
    // res.status(200).json({payload:'Login correcto', usuario});
    res.redirect('/products');
});

router.get("/github", passport.authenticate("github", {}),(req,res)=>{

});

router.get("/callbackGitHub", passport.authenticate("github", {failureRedirect:"/api/sessions/error"}),(req,res)=>{
    req.session.usuario = req.user
    
    res.setHeader('Content.Type','application/json');
    // res.status(200).json({payload:req.user});
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
    // res.status(200).json({payload:'Logout exitoso'});
    res.redirect('/login');
});