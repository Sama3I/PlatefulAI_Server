const router = require('express').Router()
const controller = require('./controller/recipeController')
const RecipeController = new controller()

router.post('/addRecipe', RecipeController.CreateRecipe)

module.exports = router