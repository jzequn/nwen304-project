const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin/get-user', adminController.getUserByID);
router.get('/admin/home', adminController.getAdmin);

module.exports = router;