import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/usuariosManagerMONGO.js';
import { generaHash } from '../utils.js';

export const router=Router();

const usuariosManager = new UsuariosManagerMongo()

router.post('/registro',async(req,res)=>{

    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content.Type','application/json')
        return res.status(400).json({error:'Complete nombre, email y password'})
    }

    let existe=await usuariosManager.getBy({email});
    if(existe){
        res.setHeader('Content.Type','application/json')
        return res.status(400).json({error:`Ya existe ${email}`})
    }

    password=generaHash(password)

    try {
        let nuevoUsuario=await usuariosManager.create({nombre, email, password}); 
        res.setHeader('Content.Type','application/json');
        res.status(200).json({
            msg: 'Registro correcto', nuevoUsuario
        });
    } catch (error) {
        console.log(error);
        res.setHeader('Content.Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor`,
                detalle:`${error.message}`
            }
        )
    }
});

router.post('/login',async(req,res)=>{
    let {email, password}=req.body;
    if(!email || !password){
        res.setHeader('Content.Type','application/json')
        return res.status(400).json({error:'Complete email y password'})
    }

    let usuario=await usuariosManager.getBy({email, password:generaHash(password)});
    if(!usuario){
        res.setHeader('Content.Type','application/json')
        return res.status(400).json({error:`Credenciales invalidas}`})
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        // Establecer el rol de administrador en la sesión del usuario
        usuario.rol = 'admin';
    }

    usuario={...usuario}
    delete usuario.password
    req.session.usuario=usuario

    res.setHeader('Content.Type','application/json');
    // res.status(200).json({payload:'Login correcto', usuario});
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