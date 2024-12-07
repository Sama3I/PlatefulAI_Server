const { RecipeModel, CategoryModel, UserModel, InstructionModel } = require('../models')
const { APIError } = require('../../utils/app-errors')

class RecipeRepository{
    async CreateRecipe(
        {name,
        userId,
        category,
        description,
        likes,
        saves,
        serving,
        time,
        calories,
        ingredients,
        tools,
        tags,
        instructions
    }){
        try{
            let currCategory = await CategoryModel.findOne(
                { name: category }, // Search for the category by name
            );
            let currUser = await UserModel.findById(userId);

            const savedInstructions = [];
            for (const instruction of instructions) {
                const { steps, image, timeTaken } = instruction;
                
                // Create and save each instruction
                const newInstruction = new InstructionModel({
                    steps: steps, // Array of step ObjectIds
                    image: image || null, // Optional image
                    timeTaken: timeTaken || 0 // Default timeTaken to 0 if not provided
                });

                const savedInstruction = await newInstruction.save();
                savedInstructions.push(savedInstruction._id); // Save the ObjectId
            }

            const newRecipe = new RecipeModel({
                name: name, 
                userId: userId,
                category: currCategory._id, 
                description: description,
                likes: likes,
                saves: saves,
                serving: serving,
                time: time,
                calories: calories,
                ingredients: ingredients,
                tools: tools,
                tags: tags,
                instructions: savedInstructions,
            })
            const recipeRes = await newRecipe.save();
            currCategory.recipes.push(recipeRes._id);
            currUser.myRecipes.push(recipeRes._id);
            await currCategory.save();
            await currUser.save();

            const recipeResult = await newRecipe.save();
            return recipeResult;
        }catch(e){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Create Customer"
            );
        }
    }
}

module.exports = RecipeRepository