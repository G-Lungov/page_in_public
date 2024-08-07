// base requirements
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// routes (req, res)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:username', userController.userController.getUserProfile);
router.put('/:username/customize', userController.customizeProfile);

// exporting modules
module.exports = router;
