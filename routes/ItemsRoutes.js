const express = require('express')
const router = express.Router();
const { putItem, getAllItems, addItem, removeItem, getfilterBytags, getAllTags } = require('./../controllers/itemController');

router.get('/:id/', getAllItems);
router.get('/:idList/:tag', getfilterBytags);
router.put('/:idItem', putItem);
router.get('/tags', getAllTags);
router.post('/:idUser/:idList', addItem);
router.delete('/:idUser/:idList/:idItem', removeItem);
router.get('/', (req,res)=> res.status(200).send('ok'));

module.exports = router;