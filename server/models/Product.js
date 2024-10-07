const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  netWeight: Number,
  grossWeight: Number,
  height: Number, 
  width: Number,
  length: Number,
  barcode: String,
  country: String,
  imageUrl: String,
  category: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Category'
  },
  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'
  },
  inventories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'}],
  code: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Product', productSchema);
