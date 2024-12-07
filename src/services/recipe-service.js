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
}

module.exports = RecipeService