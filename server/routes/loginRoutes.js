const router = require('express').Router();
const { loginUser } = require('../controllers/loginController');

// POST /login route
router.post('/', loginUser);

module.exports = router;
