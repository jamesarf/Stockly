const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const { addSubcategory, deleteSubcategory } = require('../controllers/subCategoryController')

router.post('/', verifyToken, addSubcategory);
router.delete('/:id', verifyToken, deleteSubcategory);


module.exports = router;