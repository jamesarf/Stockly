const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

const addProduct =  async (req, res) => {
  const imageUrl = req.file.filename;
  const { name, description, category, subcategory, price, netWeight, grossWeight, height, width, length, barcode, country } = req.body;
  
  try {
    
    let code = Math.random().toString(36).substr(2, 8).toUpperCase();
  do {
    code = Math.random().toString(36).substr(2, 8).toUpperCase();
  } while (await Product.exists({ code }));

    const product = new Product({ name, description, category, subcategory, price, netWeight, grossWeight, height, width, length, barcode, country, imageUrl, code });
    
    await product.save();
    
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateProduct = async (req, res) => {
  const updates = { ...req.body };
  if (req.file) {
    updates.imageUrl = req.file.filename;
  }
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .populate('subcategory')
      .populate({ path: 'inventories', model: 'Inventory' });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({_id: req.params.id}).populate('category').populate('subcategory');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const inventories = await Inventory.find({ productID: req.params.id });
    product.inventories = inventories;

    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
}


const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports ={
  addProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
}
