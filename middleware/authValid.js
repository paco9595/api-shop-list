import jwt from 'jwt-simple'
import moment from 'moment'

const secret = process.env.SECRET_TOKEN || 'Clavesecreta';

export const userAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ msg: "no tienes autorizacion" })
        }
        var token = req.headers.authorization.replace(/['"]+/g, '');
        var payload = jwt.decode(token, secret)
        const exp = moment(payload.exp)  
    } catch (ex) {
        if (ex.message === "Token expired") return res.status(401).send({ msg: "token expirado" })
        return res.status(403).send({ msg: "Token no vaildo" })
    }
    req.user = payload;
    next();
}

export const creatToken = function (user) {
    var payload = {
        _id: user.id_usuario,
        nombre: user.nombre,
        edad: user.edad,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(1, "d").unix()
    }
    return jwt.encode(payload, secret);
}