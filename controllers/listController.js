const List = require("../models/list");
const Item = require("../models/Item");
const { ObjectId } = require("mongoose").Types;
const getList = (req, res) => {
	const { idList } = req.params;
	List.find({ _id: idList }, (err, resultList) => {
		if (err) {
			return res.status(500).send({ error: err });
		}
		Item.find({ idList }, (err, results) => {
			if (err) {
				return res.status(500).send({ error: err });
			}
			console.log("resultList", resultList);
			if (!resultList.length) return res.status(200).send([]);
			return res.status(200).send({
				name: resultList[0].name,
				date: resultList[0].date,
				color: resultList[0].color,
				item: results,
			});
		});
	});
};
const getAllList = (req, res) => {
	const { idUser } = req.params;
	List.find({ idUser }, (err, results) => {
		if (err) {
			return res.status(500).send({ error: `error: ${err}` });
		}
		return res.status(200).send(results);
	}).sort({ date: -1 });
};
const getSharedList = (req, res) => {
	const { idUser, idOwner, idList, ownerList } = req.params;
	List.find({ _id: idList, idUser }, (err, results) => {
		const list = results[0];
		if (list) {
			List.find(
				{ _id: ownerList, idUser: list.idUser },
				(err, validUser) => {
					//const user =
				}
			);
		}
		return res.status(200).send(results);
	});
};
const addList = (req, res) => {
	const { name, idUser, items } = req.body;
	if (!name && !idUser) {
		return res.status(400).send({ error: "bad request" });
	}
	const createList = new List(req.body);
	createList.save((err, newList) => {
		if (err) {
			return res.status(500).send({ error: `error: ${err}` });
		}
		console.log("new", newList);
		const { _id, name, idUser, date, color } = newList;
		if (items.length) {
			const formatItem = items.map((i) => ({
				...i,
				idList: _id,
				idUser,
			}));
			Item.insertMany(formatItem, (err, responseItem) => {
				if (err)
					return res.status(500).send({ error: `error: ${err}` });
				console.log("data Item", responseItem);
				return res.status(200).send({
					_id,
					name,
					idUser,
					date,
					color,
				});
			});
		} else {
			return getAllList(req, res);
		}
	});
};
const removeList = (req, res) => {
	const { idList, idUser } = req.params;
	console.log("data", req.params);
	List.deleteOne({ _id: ObjectId(idList) }, (err, results) => {
		if (err) {
			return res.status(500).send({ error: `error: ${err}` });
		}
		Item.deleteMany({ idList }, (err) => {
			if (err) return res.status(500).send({ error: `error: ${err}` });
			return res.status(200).send({ results });
		});
	});
};
const updateLit = (req, res) => {
	const { idList, idUser } = req.params;
	const { name, items, color } = req.body;
	List.findByIdAndUpdate(
		{ _id: ObjectId(idList) },
		{ color, name },
		(err, response) => {
			console.log("res", response);
			const { _id, date } = response;
			if (err) {
				return res.status(500).send({ error: `error: ${err}` });
			}
			if (items && items.length) {
				Item.deleteMany({ idList }, (err) => {
					if (err)
						return res
							.status(500)
							.send({ error: `test 1 error: ${err}` });
					const formatItem = items.map((i) => {
						const { marca, cantidad, checked, name } = i;
						return {
							idList: _id,
							idUser,
							marca,
							cantidad,
							checked,
							date,
							name,
						};
					});
					console.log("formatItem", formatItem);
					Item.insertMany(formatItem, (err, item) => {
						if (err)
							return res
								.status(500)
								.send({ error: `test 2error: ${err}` });
						console.log("data Item", item);
						return res.status(200).send({
							_id,
							name,
							idUser,
							date,
							color,
							item,
						});
					});
				});
			} else {
				return res.status(200).send({ _id, name, idUser, date, color });
			}
		}
	);
};

module.exports = {
	getList,
	getAllList,
	addList,
	removeList,
	updateLit,
	getSharedList,
};
