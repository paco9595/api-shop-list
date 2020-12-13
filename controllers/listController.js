const List = require('../models/list');
const Item = require('../models/Item');
const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
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
            if (!resultList.length) return res.status(200).send([]);
            return res.status(200).send({
                name: resultList[0].name,
                date: resultList[0].date,
                color: resultList[0].color,
                item: results
            });
        });
    });
};
const getAllList = (req, res) => {
    const { idUser } = req.params;
    List.find({ idUser }, async (err, results) => {
        if (err) {
            return res.status(500).send({ error: `error: ${err}` })
        }
        console.log('test si entra')
        if (results.length) {
            console.log('si entro')
            results = await Promise.all(results.map(async (i) => {
                try {
                    const items = await Item.find({ idList: i._id });
                    console.log('i', i)
                    console.log('test items', items)
                    return {
                        idUser: i.idUser,
                        name: i.name,
                        _id: i.id,
                        color: i.color,
                        item: items.slice(0, 5)
                    };
                    
                } catch (error) {

                }
            }));
        }
        console.log('primero', results)
        return res.status(200).send(results);

    });
}
const addList = (req, res) => {
    const { name, idUser, items } = req.body;
    if (!name && !idUser) {
        return res.status(400).send({ error: 'bad request' })
    }
    const createList = new List(req.body);
    createList.save((err, newList) => {
        if (err) {
            return res.status(500).send({ error: `error: ${err}` })
        }
        console.log('new', newList);
        const { _id, name, idUser, date, color} = newList;
        if (items.length) {
            const formatItem = items.map(i => ({ ...i, idList: _id, idUser }))
            Item.insertMany(formatItem, (err, responseItem) => {
                if (err) return res.status(500).send({ error: `error: ${err}` })
                console.log('data Item', responseItem)
                return res.status(200).send({
                    _id,
                    name,
                    idUser,
                    date,
                    color
                });
            })
        } else {
            return res.status(200).send({ _id, name, idUser, date, color });
        }


    })
}
const removeList = (req, res) => {
    const { idList, idUser } = req.params;
    console.log('data', req.params)
    List.deleteOne({ "_id": ObjectId(idList) }, (err, results) => {
        if (err) {
            return res.status(500).send({ error: `error: ${err}` })
        }
        console.log('si correo este')
        Item.deleteMany({ idList }, err => {
            if (err) return res.status(500).send({ error: `error: ${err}` })
            return res.status(200).send({ results });

        })
    })

}
const updateLit = (req, res) => { }

module.exports = {
    getList,
    getAllList,
    addList,
    removeList,
    updateLit
}