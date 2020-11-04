const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const itemRoutes = require('./ItemsRoutes');
const UserRoutes = require('./userRoutes');

app.use(bodyParser.json());
app.use(cors());


app.use('/item', itemRoutes)
app.use('/user', UserRoutes)

module.exports = app;

