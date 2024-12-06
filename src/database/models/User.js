const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserModel = new Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    myRecipes: [
        {type: Schema.Types.ObjectId, ref: 'recipe', require: true,}
    ],
    likedRecipes: [
        {type: Schema.Types.ObjectId, ref: 'recipe', require: true,}
    ],
    savedRecipes: [
        {type: Schema.Types.ObjectId, ref: 'recipe', require: true,}
    ],
})

module.exports = mongoose.model('user', UserModel)