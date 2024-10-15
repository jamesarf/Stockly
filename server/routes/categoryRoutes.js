const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const {getCategories, addCategory, deleteCategory,} = require('../controllers/categoryController');

router.get('/', verifyToken, getCategories);
router.post('/', verifyToken, addCategory);
router.delete('/:id', verifyToken, deleteCategory);


module.exports = router;