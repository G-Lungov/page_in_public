// base requirements
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const salesPage = require('../views/salesPage')

// routes (req, res)
router.get('/', salesPage)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:username', userController.userController.getUserProfile);
router.post('/:username/customize', userController.updateCustomizations);

// exporting modules
module.exports = router;
