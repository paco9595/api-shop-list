const jwt = require('jwt-simple')
const moment = require('moment')
var secret = process.env.SECRET_WORD || "Clavesecreta";

const creatToken = user => {
  var payload = {
    _id: user.id_usuario,
    nombre: user.nombre,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(1, "d").unix()
  }
  return jwt.encode(payload, secret);
}

module.exports = creatToken;