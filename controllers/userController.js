const { OAuth2Client } = require('google-auth-library');
const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../models/user')
const creatToken = require('./../services/token');
const axios = require('axios');

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

const facebookAuth = async (req, res) => {
    const { accessToken, email, name, picture } = req.body;
    axios.get(`https://graph.facebook.com/oauth/access_token?client_id=1533292150198885&client_secret=4de82c8478a3f52d3ab320ddaddda964&grant_type=client_credentials`).then(data => {
        const { access_token } = data.data
        axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${access_token}`).then(response => {
            console.log('final response', response.data)
            console.log('final response', response.data.data.is_valid)
            const { is_valid } = response.data.data;

            if (is_valid) {
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
            } else {
                return res.status(500).send('error: invalid Tokens')
            }
        })
    })
};


module.exports = {
    googleAuth,
    facebookAuth
}