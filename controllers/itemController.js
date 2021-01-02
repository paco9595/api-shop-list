const Item = require("./../models/Item");
const { getList } = require("./listController");
const Tag = require("./../models/tag");
const { ObjectId } = require("mongoose").Types;

const getAllItems = async (req, res) => {
	try {
		const items = await Item.find();
		res.status(200).send(items);
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

const addItem = async (req, res) => {
	const { idUser, idList } = req.params;
	const { nombre, cantidad, marca, tags } = req.body;
	console.log("body", tags);
	const item = new Item({
		nombre,
		// cantidad,
		// marca,
		// tags,
		idList,
		idUser,
	});
	// tags.map(async i => {
	//     const search = await Tag.find({ nombre: i });
	//     console.log('search', search);
	//     console.log('search', search.length);
	//     if (!search.length) {
	//         const newTag = new Tag({
	//             nombre: i
	//         });
	//         newTag.save();
	//     }

	// })
	newItem.save((err, newItem) => {
		if (err) {
			return res.status(500).send({ error: `error: ${err}` });
		}
		return getList(req, res);
	});
};

const removeItem = async (req, res) => {
	const { idList, idUser, idItem } = req.params;
	console.log("idList", idList);
	console.log("idUser", idUser);
	console.log("idItem", idItem);
	Item.deleteOne(
		{ _id: ObjectId(idItem), idList, idUser },
		(err, results) => {
			if (err) return res.status(500).send({ error: `error: ${err}` });
			console.log("results", results);
			return res.status(200).send({ results });
		}
	);
};

const getfilterBytags = async (req, res) => {
	const { tag } = req.params;
	console.log("tag", tag);
	try {
		const items = await Item.find();
		const filterItems = items.filter((i) => i.tags.includes(tag));
		res.status(200).send(filterItems);
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

const getAllTags = async (req, res) => {
	try {
		const tags = await Tag.find();
		res.status(200).send(tags);
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

const putItem = async (req, res) => {
	const { idItem } = req.params;
	const { name, cantidad, marca, tags, checked } = req.body.data;
	try {
		Item.updateOne(
			{ _id: ObjectId(idItem) },
			{
				$set: {
					name,
					cantidad,
					marca,
					tags,
					checked,
				},
			},
			(err, results) => {
				if (err)
					return res.status(500).send({ error: `error: ${err}` });
				return res.status(200).send({ results });
			}
		);
	} catch (error) {
		return res.status(500).send({ error: `error: ${error}` });
	}
};

module.exports = {
	getAllItems,
	addItem,
	removeItem,
	getfilterBytags,
	getAllTags,
	putItem,
};
