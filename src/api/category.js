const router = require('express').Router()
const controller = require('./controller/categoryController');
const CustomerController = new controller();

router.post('/addCategory', CustomerController.CreateEmptyCategory)

module.exports = router