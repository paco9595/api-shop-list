const { OAuth2Client } = require('google-auth-library');
const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleLogin = (req, res) => {
    const { idToken } = req.body;
    Client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    }).then(data => {
        console.log(data.payload)
        res.status(200).send({token: 'token'});
    });
}


module.exports = {
    googleLogin
}