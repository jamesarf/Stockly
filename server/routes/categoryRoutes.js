const router = require('express').Router();
const {getCategories, addCategory, deleteCategory,} = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', addCategory);
router.delete('/:id', deleteCategory);


module.exports = router;