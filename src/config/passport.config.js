import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import { UsuariosManagerMongo } from "../dao/usuariosManagerMONGO.js";
import { generaHash, validaPassword } from "../utils.js";
import { createCartService } from "../services/carts.js";
import { config } from "./config.js";

const usuariosManager=new UsuariosManagerMongo();

//paso1

export const initPassport=()=>{

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField:"email",
                passReqToCallback: true
            },
            async(req, username, password, done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){
                        // res.setHeader('Content.Type','application/json')
                        // return res.status(400).json({error:'Complete nombre, email y password'})
                        return done(null, false);
                    }

                    let {apellido}=req.body
                    if(!apellido){
                        return done(null, false);
                    }
                
                    let existe=await usuariosManager.getBy({email: username});
                    if(existe){
                        // res.setHeader('Content.Type','application/json')
                        // return res.status(400).json({error:`Ya existe ${email}`})
                        return done(null, false);
                    }
                    
                    let {edad}=req.body
                    if(!edad){
                        return done(null, false);
                    }
                
                    password=generaHash(password)

                    const nuevoCarrito = await createCartService();
                
                        let nuevoUsuario=await usuariosManager.create({nombre, apellido, email:username, edad, password, carrito: nuevoCarrito._id}); 
                        return done(null, nuevoUsuario);
                        // res.status(200).json({
                        //     msg: 'Registro correcto', nuevoUsuario
                        // });
                        res.redirect('/login');

                } catch (error) {
                    return done(error)
                }
            } 
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField:"email",
            },
            async(username, password, done)=>{
                try {
                    let usuario=await usuariosManager.getBy({email:username});
                    if(!usuario){
                            // res.setHeader('Content.Type','application/json')
                            // return res.status(400).json({error:`Credenciales invalidas`})
                            return done(null, false)
                    }

                    if(!validaPassword(password, usuario.password)){
                            // res.setHeader('Content.Type','application/json')
                            // return res.status(400).json({error:`Credenciales invalidas`})
                            return done(null, false)
                    }

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:config.CLIENT_ID_GITHUB,
                clientSecret:"d4eb37835fd3f49237f94111674661c9c8d6cb50",
                callbackURL:"https://localhost:8080/api/sessions/callbackGitHub"
            },
            async(tokenAcceso, tokenRefresh, profile, done)=>{
                try {
                    let email = profile._json.email
                    let nombre = profile._json.name
                    if(!nombre || !email){
                        return done(null, false)
                    }
                    let usuario = await usuariosManager.getBy({email})
                    if(!usuario){
                        const nuevoCarrito = await createCartService();

                        usuario=await usuariosManager.create({
                            nombre, email, profile, carrito: nuevoCarrito._id
                        });
                    }

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    //paso1bis - solo si usamos sessions, usamos serializer
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario = await usuariosManager.getBy({_id:id})
        return done(null, usuario)
    })

}