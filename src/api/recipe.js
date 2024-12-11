const router = require('express').Router()
const controller = require('./controller/recipeController')
const RecipeController = new controller()
const authenticate = require('./middleware/middleware')

router.get('/', authenticate, RecipeController.GetRecipes)

router.post('/addRecipe', authenticate, RecipeController.CreateRecipe)
router.post('/like/:id', authenticate, RecipeController.Like);
router.post('/save/:id', authenticate, RecipeController.Save);

router.put('/updateTags/:id', authenticate, RecipeController.UpdateRecipeTags)

module.exports = router