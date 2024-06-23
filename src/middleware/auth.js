export const auth = (req, res, next) => {
    if(!req.session.usuario){
        res.setHeader('Content.Type','application/json')
        return res.status(401).json({error:`No existen usuarios autenticados}`})
    }

    next()
}

export const isAdmin = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol === 'admin') {
        return next();
    }
    return res.status(403).send('Acceso denegado. Solo administradores pueden realizar esta acción.');
};

export const isUser = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol === 'user') {
        return next();
    }
    return res.status(403).send('Acceso denegado. Solo usuarios pueden realizar esta acción.');
};