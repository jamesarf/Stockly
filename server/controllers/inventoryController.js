const Inventory = require('../models/Inventory');

const addInventory = async (req, res) => {
    const { productID, quantity, expirationDate } = req.body;

    try {
        let inventoryItem = await Inventory.findOne({ productID, expirationDate });

        if (inventoryItem) {
            inventoryItem.quantity = quantity;
        } else {
            inventoryItem = new Inventory({ productID, quantity, expirationDate });
        }
        await inventoryItem.save();

        res.status(201).send(inventoryItem);
    } catch (err) {
        res.status(400).send(err);
    }
};


const getInventory = async (req, res) => {

    try {
        const inventories = await Inventory.find({ ...req.query });

        res.status(200).json(inventories);
    } catch (err) {
        res.status(400).send(err);
    }
};


const updateInventory = async (req, res) => {
    const { quantity } = req.body;
    try {
        const inventory = await Inventory.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        res.status(200).json(inventory); // Return the updated inventory
    } catch (err) {
        res.status(400).send(err);
    }
};



const deleteInventories = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { addInventory, getInventory, updateInventory, deleteInventories }