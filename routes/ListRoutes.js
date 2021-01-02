const express = require('express')
const router = express.Router();
const { getList, getAllList, addList, removeList, updateLit, getSharedList } = require('./../controllers/listController');

router.get('/:idUser', getAllList);
router.get('/:idUser/:idList', getList);
router.get('/:idUser/:idList/share/:idOwner/:ownerList', getSharedList);
router.post('/:idUser', addList);
router.delete('/:idUser/:idList', removeList);
router.put('/:idUser/:idList', updateLit)

module.exports = router;