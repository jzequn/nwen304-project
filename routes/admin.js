const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin/get-user', adminController.getUserByID);
router.get('/admin/get-order', adminController.getOrderByID);
router.get('/admin/home', adminController.getAdmin);
router.get('/admin/review-user', adminController.getEditPage);
router.get('/admin/review-order', adminController.getOrderEditPage);
router.post('/admin/put-user-details', adminController.putNewDetails);



module.exports = router;