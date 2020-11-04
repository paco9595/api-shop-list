const express = require('express')
const router = express.Router();
const { getAllItems, addItem, removeItem, getfilterBytags, getAllTags } = require('./../controllers/itemController');

router.get('/:id/', getAllItems);
router.get('/list/:tag', getfilterBytags);
router.get('/tags', getAllTags);
router.post('/list', addItem);
router.delete('/list', removeItem);
router.get('/', (req,res)=> res.status(200).send('ok'));

module.exports = router;