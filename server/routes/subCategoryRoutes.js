const router = require('express').Router();
const { addSubcategory, deleteSubcategory } = require('../controllers/subCategoryController')

router.post('/', addSubcategory);
router.delete('/:id', deleteSubcategory);


module.exports = router;