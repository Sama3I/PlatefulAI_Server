const CategoryService = require("../../services/category-service");

const service = new CategoryService();

class CategoryController{
    constructor() {};

    async CreateEmptyCategory(req, res, next){
        try {
            const categories = Array.isArray(req.body) ? req.body : [req.body]; 
            const result = await Promise.all(
                categories.map(async (category) => {
                    const { name } = category;
    
                    // Call the service to create a product
                    const { data } = await service.CreateEmptyCategory(name);

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

    async GetCategories(req, res, next){
        try {
            const { data } = await service.GetCategories()
    
            // Return all the results
            return res.json(data);
    
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = CategoryController