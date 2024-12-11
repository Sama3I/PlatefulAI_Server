const { RecipeModel, CategoryModel, UserModel, InstructionModel } = require('../models')

class UserRepository{
    async GetUser(id){
        try {
            const populatedUser = await UserModel.findById(id)
                .populate({
                    path: 'myRecipes',
                    populate: [
                        { path: 'category', select: 'name' },
                        // THIS IS DIFFERENT BECOZ INSTRUCTION IS NOT JUST ONE OBJECTID
                        // BUT INSTEAD IT IS A LIST OF IT
                        { 
                            path: 'instructions', 
                            populate: { path: 'steps' },
                        },
                        { path: 'user', select: ['username', 'email'] },
                    ], 
                })
                .populate({
                    path: 'likedRecipes',
                    populate: [
                        { path: 'category', select: 'name' },
                        { 
                            path: 'instructions', 
                            populate: { path: 'steps' },
                        },
                        { path: 'user', select: ['username', 'email'] },
                    ], 
                })
                .populate({
                    path: 'savedRecipes',
                    populate: [
                        { path: 'category', select: 'name' },
                        { 
                            path: 'instructions', 
                            populate: { path: 'steps' },
                        },
                        { path: 'user', select: ['username', 'email'] },
                    ], 
                });
            return populatedUser
        } catch (err) {
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Get Products"
        );
        }
    }
}

module.exports = UserRepository