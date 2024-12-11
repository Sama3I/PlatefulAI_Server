const { RecipeModel, CategoryModel, UserModel, InstructionModel } = require('../models')
const { APIError } = require('../../utils/app-errors')

class RecipeRepository{
    async CreateRecipe(
        {name,
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
        instructions
    }){
        try{
            let currCategory = await CategoryModel.findOne(
                { name: category }, // Search for the category by name
            );
            let currUser = await UserModel.findById(user);
            const id = currUser._id
            const savedInstructions = [];
            for (const instruction of instructions) {
                const { title, steps, image, timeTaken } = instruction;
                // Create and save each instruction
                const newInstruction = new InstructionModel({
                    title: title,
                    steps: steps, // Array of step ObjectIds
                    image: image || null, // Optional image
                    timeTaken: timeTaken || 0 // Default timeTaken to 0 if not provided
                });

                const savedInstruction = await newInstruction.save();
                savedInstructions.push(savedInstruction._id); // Save the ObjectId
            }
            const newRecipe = new RecipeModel({
                name: name, 
                user: id,
                category: currCategory._id, 
                description: description,
                likes: likes,
                saves: saves,
                savedBy: [],
                likedBy: [],
                serving: serving,
                time: time,
                calories: calories,
                image: image,
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

    async Recipes(){
        try {
            return await RecipeModel.find()
                .populate("instructions")
                .populate({
                    path: "category",
                    select: "name"
                })
                .populate({
                    path: "user",
                    select: ["username", "email"]
                });
        } catch (err) {
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Get Products"
        );
        }
    }

    async likeRecipe({id, userId}){
        try {
            const recipe = await RecipeModel.findById(id);

            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const hasLiked = recipe.likedBy.includes(userId);
            if (hasLiked) {
                // Unlike the recipe
                recipe.likedBy = recipe.likedBy.filter(user => user.toString() !== userId.toString());
                recipe.likes -= 1;
                user.likedRecipes = user.likedRecipes.filter(
                    likedRecipe => likedRecipe.toString() !== id.toString()
                );
            } else {
                // Like the recipe
                recipe.likedBy.push(userId);
                recipe.likes += 1;
                user.likedRecipes.push(recipe._id);
            }

            await recipe.save();
            await user.save();

            return { message: hasLiked ? 'Unliked' : 'Liked', likes: recipe.likes };
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async saveRecipe({id, userId}){
        try {
            const recipe = await RecipeModel.findById(id);

            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const hasSaved = recipe.savedBy.includes(userId);
            if (hasSaved) {
                // Unlike the recipe
                recipe.savedBy = recipe.savedBy.filter(user => user.toString() !== userId.toString());
                recipe.saves -= 1;
                user.savedRecipes = user.savedRecipes.filter(
                    savedRecipe => savedRecipe.toString() !== id.toString()
                );
            } else {
                // Like the recipe
                recipe.savedBy.push(userId);
                recipe.saves += 1;
                user.savedRecipes.push(recipe._id);
            }

            await recipe.save();
            await user.save();

            return { message: hasSaved ? 'Unsaved' : 'saved', saves: recipe.saves };
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async UpdateRecipeTags({id, time, serving, calories}){
        try {
            const recipe = await RecipeModel.findById(id);
    
            if (!recipe) {
                return res.status(404).json({ message: 'recipe not found' });
            }
    
            if (time !== undefined) {
                recipe.time = time;
            }
    
            if (serving !== undefined) {
                recipe.serving = serving;
            }
    
            if (calories !== undefined) {
                recipe.calories = calories;
            }
    
            await recipe.save();
    
            return { message: 'Recipe stats updated successfully', recipe };
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = RecipeRepository