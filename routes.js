const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllItems, addItem, removeItem, getfilterBytags, getAllTags } = require('./controller');

app.use(bodyParser.json());
app.use(cors());

app.get('/list', getAllItems);
app.get('/list/:tag', getfilterBytags);
app.get('/tags', getAllTags);
app.post('/list', addItem);
app.delete('/list', removeItem);
app.get('/', (req,res)=> res.status(200).send('ok'));


module.exports = app;