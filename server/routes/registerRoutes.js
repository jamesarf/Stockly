router = require('express').Router();
const {createUser} = require('../controllers/registerController');


router.post('/',createUser);

module.exports = router;