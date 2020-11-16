const { OAuth2Client } = require('google-auth-library');
const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../models/user')
const creatToken = require('./../services/token');

const googleAuth = (req, res) => {
    const { idToken } = req.body;
    Client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    }).then(data => {
        const { email_verified, email, picture, name } = data.payload;
        if (email_verified) {
            return User.findOne({ email }).then(result => {
                if (result) {
                    console.log('good TESRT', result);
                    const token = creatToken(result);
                    return res.status(200).send({
                        token,
                        id: result['_id'],
                        email: result.email,
                        picture: result.picture,
                        name: result.name
                    });
                } else {
                    const user = new User({
                        email,
                        picture,
                        name
                    });
                    return user.save((err, newUser) => {
                        if (err) {
                            console.error(`Failed to insert item: ${err}`);
                            return res.status(500).send('error: ' + err)
                        }
                        profile = newUser;
                        console.log(`Successfully inserted item with _id: ${newUser}`)
                        const token = creatToken(newUser);
                        return res.status(200).send({ token, ...newUser });
                    });
                }
            }).catch(e => {
                console.log('error', e)
                return res.status(500).send('error: ' + e)
            })
        }
    });
};

const facebookAuth = (req, res) => {
};


module.exports = {
    googleAuth,
    facebookAuth
}