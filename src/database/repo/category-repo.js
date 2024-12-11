const { CategoryModel } = require('../models')
const { APIError } = require('../../utils/app-errors')

class CategoryRepository{
    async CreateEmptyCategory(name){
        try{
            const existingCategory = await CategoryModel.findOne({ name: name });
            if (!existingCategory) {
                const newCategory = new CategoryModel({name: name, recipes: []})
                const categoryResult = await newCategory.save();
                return categoryResult;
            }
            return null;
        }catch(e){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Create Customer"
            );
        }
    }

    async GetCategories(){
        try{
            return await CategoryModel.find()
                .populate({
                    path: 'recipes',
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
                });
        }catch(e){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Create Customer"
            );
        }
    }
}

module.exports = CategoryRepository;