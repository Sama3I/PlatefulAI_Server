const { CategoryRepository } = require('../database')
const { APIError } = require('../utils/app-errors')
const { FormateData } = require("../utils");

class CategoryService{
    constructor(){
        this.repository = new CategoryRepository();
    }

    async CreateEmptyCategory(name){
        try{
            const categoryResult = await this.repository.CreateEmptyCategory(name)
            
            return FormateData(categoryResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
}

module.exports = CategoryService;