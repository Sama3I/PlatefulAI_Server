const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstructionModel = new Schema({
    steps: [
        {type: Schema.Types.ObjectId, ref: 'step', require: true}
    ],
    image: String,
    timeTaken: Number,
})

module.exports = mongoose.model('instruction', InstructionModel)