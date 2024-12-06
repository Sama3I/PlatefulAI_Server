const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name : String,
    recipes: [
        {type: Schema.Types.ObjectId, ref: 'recipe'}
    ]
})

module.exports = new mongoose.model('category', CategorySchema)