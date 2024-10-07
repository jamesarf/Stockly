const router = require('express').Router();
const upload = require('../middleware/upload');
const { addProduct, updateProduct, getProducts, getProductById, deleteProduct } = require('../controllers/productController');


// Define route
router.post('/', upload.single('image'), addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
