const { UserRepository } = require('../database')
const { APIError } = require('../utils/app-errors')
const { FormateData } = require("../utils");

class UserService {
    constructor(){
        this.repository = new UserRepository()
    }
    async GetUserData(id){
        try{
            const user = await this.repository.GetUser(id);
            return FormateData(user)
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
}

module.exports = UserService