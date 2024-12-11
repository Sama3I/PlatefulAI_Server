const router = require('express').Router()
const controller = require('./controller/recipeController')
const RecipeController = new controller()
const authenticate = require('./middleware/middleware')

router.post('/addRecipe', authenticate, RecipeController.CreateRecipe)
router.get('/', authenticate, RecipeController.GetRecipes)

module.exports = router