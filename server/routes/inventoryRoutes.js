const { addInventory, getInventory, updateInventory, deleteInventories } = require('../controllers/inventoryController');
const router = require('express').Router();

router.post('/', addInventory);
router.get('/', getInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventories);

module.exports = router;