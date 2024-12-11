const { RecipeRepository } = require('../database')
const { APIError } = require('../utils/app-errors')
const { FormateData } = require("../utils");

class RecipeService{
    constructor(){
        this.repository = new RecipeRepository()
    }

    async CreateRecipe(inputs){
        try{
            const recipeResult = await this.repository.CreateRecipe(inputs)
            return FormateData(recipeResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async GetRecipes(){
        try{
            const recipes = await this.repository.Recipes();
            
            return FormateData(recipes)

        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async LikeRecipe(inputs){
        try{
            const result = await this.repository.likeRecipe(inputs);
            return FormateData(result)
        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async SaveRecipe(inputs){
        try{
            const result = await this.repository.saveRecipe(inputs);
            return FormateData(result)
        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async UpdateRecipeTags(inputs){
        try{
            const result = await this.repository.UpdateRecipeTags(inputs);
            return FormateData(result)
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
}

module.exports = RecipeService