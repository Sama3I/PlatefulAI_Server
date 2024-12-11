const RecipeService = require('../../services/recipe-service')
const service = new RecipeService();

class RecipeController{
    constructor() {}

    async CreateRecipe(req, res, next){
        try {
            const recipes = Array.isArray(req.body) ? req.body : [req.body]; 
            
            const result = await Promise.all(
                recipes.map(async (recipe) => {
                    const {
                        name,
                        user,
                        category,
                        description,
                        likes,
                        saves,
                        serving,
                        time,
                        calories,
                        image,
                        ingredients,
                        tools,
                        tags,
                        instructions } = recipe;

                    // Call the service to create a recipe
                    const { data } = await service.CreateRecipe({ 
                        name, user, category, description, likes, saves, serving, time, calories, image, ingredients, tools, tags, instructions });

                    return data;
                })
            );
    
            // Return all the results
            return res.json(result);
    
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async GetRecipes(req, res, next){
        try {
            const { data} = await service.GetRecipes();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
    }
}

module.exports = RecipeController