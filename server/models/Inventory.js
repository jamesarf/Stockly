const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
	productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
	quantity: Number,
	expirationDate: Date,
});

module.exports = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);