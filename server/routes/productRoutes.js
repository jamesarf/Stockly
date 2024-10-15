const router = require('express').Router();
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const { addProduct, updateProduct, getProducts, getProductById, deleteProduct } = require('../controllers/productController');


// Define route
router.post('/', verifyToken, upload.single('image'), addProduct);
router.get('/', verifyToken, getProducts);
router.get('/:id', verifyToken, getProductById);
router.put('/:id', verifyToken, upload.single('image'), updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
