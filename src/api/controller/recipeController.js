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
        } catch (err) {
            next(err)
        }
    }

    async Like(req, res, next){
        try{
            const { id } = req.params; // Recipe ID
            const userId = req.user._id; // User ID from authenticated user
            const {data} = await service.LikeRecipe({id, userId})

            return res.json(data);
        }catch(err){
            next(err)
        }
    }

    async Save(req, res, next){
        try{
            const { id } = req.params; // Recipe ID
            const userId = req.user._id; // User ID from authenticated user
            const {data} = await service.SaveRecipe({id, userId})

            return res.json(data);
        }catch(err){
            next(err)
        }
    }

    async UpdateRecipeTags(req, res, next){
        try {
            const { id } = req.params;
            const { time, serving, calories } = req.body
            const { data } = await service.UpdateRecipeTags({id, time, serving, calories})
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RecipeController