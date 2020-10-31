const Item = require('./models/Item');
const Tag = require('./models/tag');

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send({ message: error })
    }

}

const addItem = async (req, res) => {
    const { nombre, cantidad, marca, tags } = req.body;
    console.log('body', tags)
    try {
        const newItem = new Item({
            nombre,
            cantidad,
            marca,
            tags
        });
        tags.map(async i => {
            const search = await Tag.find({ nombre: i });
            console.log('search', search);
            console.log('search', search.length);
            if (!search.length) {
                const newTag = new Tag({
                    nombre: i
                });
                newTag.save();
            }

        })
        const item = await newItem.save()
        res.status(200).send(item)
    } catch (error) {
        res.status(500).send({ message: err });

    }
}

const removeItem = async (req, res) => {
    const { id } = req.body;
    try {
        const items = await Item.findByIdAndRemove(id);
        res.status(200).send({ message: "elemento eliminado", items })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const getfilterBytags = async (req, res) => {
    const { tag } = req.params;
    console.log('tag', tag)
    try {
        const items = await Item.find();
        const filterItems = items.filter(i => i.tags.includes(tag))
        res.status(200).send(filterItems)
    } catch (error) {
        res.status(500).send({ message: error })
    }

}

const getAllTags = async (req, res) => {

    try {
        const tags = await Tag.find();
        res.status(200).send(tags)
    } catch (error) {
        res.status(500).send({ message: error })
    }

};


module.exports = {
    getAllItems,
    addItem,
    removeItem,
    getfilterBytags,
    getAllTags
}