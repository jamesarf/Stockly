const Inventory = require('../models/Inventory');
const Product = require('../models/Product');


const addInventory = async (req, res) => {
    const { productID, quantity, expirationDate } = req.body;

    try {
        // Find inventory item by productID and expirationDate
        let inventoryItem = await Inventory.findOne({ productID, expirationDate });

        if (inventoryItem) {
            // If inventory item exists and expirationDate matches
            const updatedQuantity = Number(inventoryItem.quantity) + Number(quantity); // Add new quantity to existing one
            inventoryItem = await Inventory.findByIdAndUpdate(
                inventoryItem._id,
                { quantity: updatedQuantity },
                { new: true }
            );
            res.status(200).json(inventoryItem); // Return the updated inventory item
        } else {
            // If no inventory item exists or expirationDate doesn't match, create a new one
            inventoryItem = new Inventory({ productID, quantity, expirationDate });
            await inventoryItem.save(); // Save the new inventory item
            res.status(201).json(inventoryItem); // Return the newly created inventory item
        }

    } catch (err) {
        res.status(400).send(err); // Send a 400 error response
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

const getInventoryOverview = async (req, res) => {
    try {
        // Total number of products
        const totalProducts = await Product.countDocuments();

        // Get today's date and calculate the date 30 days from now
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);

        // Count the number of products that will expire in the next 30 days
        const expiringProducts = await Inventory.countDocuments({
            expirationDate: { $gte: today, $lt: thirtyDaysFromNow }
        });

        const lowStockProducts = await Inventory.countDocuments({
            quantity: { $lt: 10 }
        });

        res.status(200).json({
            totalProducts,
            expiringProducts,
            lowStockProducts
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


module.exports = { 
    addInventory, 
    // getInventories, 
    // getInventoryByIdExpDate,
    updateInventory, 
    deleteInventories,
    getInventoryOverview,
 }