const { 
    addInventory, 
    // getInventories, 
    // getInventoryByIdExpDate, 
    updateInventory, 
    deleteInventories, 
    getInventoryOverview } = require('../controllers/inventoryController');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/', addInventory);
// router.get('/', getInventories);
// router.get('/:productID/:expirationDate', getInventoryByIdExpDate);
router.get('/overview', verifyToken, getInventoryOverview);
router.put('/:id', verifyToken, updateInventory);
router.delete('/:id', verifyToken, deleteInventories);

module.exports = router;