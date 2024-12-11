const router = require('express').Router()
const controller = require('./controller/categoryController');
const CustomerController = new controller();
const authenticate = require('./middleware/middleware')

router.post('/addCategory', authenticate, CustomerController.CreateEmptyCategory)
router.get('/', authenticate, CustomerController.GetCategories)

module.exports = router