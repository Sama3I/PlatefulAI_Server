const router = require('express').Router()
const controller = require('./controller/userController');
const UserController = new controller();
const authenticate = require('./middleware/middleware')

router.get('/getUser', authenticate, UserController.GetUser)

module.exports = router