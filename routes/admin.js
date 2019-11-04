// Author: Antony Helsby

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin/home', adminController.getAdmin); // home page for admin

router.get('/admin/get-user', adminController.getUserByID); // shows one user

router.get('/admin/get-order', adminController.getOrderByID); // shows one order

router.get('/admin/review-order', adminController.getOrderReviewPage); // shows list of orders

router.get('/admin/edit-user', adminController.getUserPageForEdit); // shows user with editable fields

router.get('/admin/edit-order', adminController.getOrderPageForEdit); // shows order with editable fields

router.post('/admin/put-user-details', adminController.putUserDetails); // updates user with new details

router.post('/admin/put-order-details', adminController.putOrderDetails); // updates order with new details





module.exports = router;