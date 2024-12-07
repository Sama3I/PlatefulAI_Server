const router = require('express').Router()
const controller = require('./controller/recipeController')
const RecipeController = new controller()

router.post('/addRecipe', RecipeController.CreateRecipe)
router.get('/', RecipeController.GetRecipes)

module.exports = router