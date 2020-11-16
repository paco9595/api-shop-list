const List = require('../models/list');
const Item = require('../models/Item');
const getList = (req, res) => {
    const { idList } = req.params;
    List.find({ _id: idList }, (err, resultList) => {
        if (err) {
            return res.status(500).send({ error: err })
        }
        Item.find({ idList }, (err, results) => {
            if (err) {
                return res.status(500).send({ error: err })
            }
            console.log('resultList', resultList)
            
            return res.status(200).send({
                name: resultList[0].name,
                date: resultList[0].date,
                item: results
            });
        });
    });
};
const getAllList = (req, res) => {
    const { idUser } = req.params;
    List.find({ idUser }, (err, results) => {
        if (err) {
            return res.status(500).send({ error: `error: ${err}` })
        }
        console.log('all', results)
        return res.status(200).send(results);
    });
}
const addList = (req, res) => {
    const { name, idUser, date } = req.body;
    if (!name && !idUser && !date) {
        return res.status(400).send({ error: 'bad request' })
    }
    const createList = new List(req.body);
    createList.save((err, newList) => {
        if (err) {
            return res.status(500).send({ error: `error: ${err}` })
        }
        return res.status(200).send({ ...newList });
    })
}
const removeList = (req, res) => { }
const updateLit = (req, res) => { }

module.exports = {
    getList,
    getAllList,
    addList,
    removeList,
    updateLit
}