const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstructionModel = new Schema({
    title: {type: String, require: true},
    steps: [
        {
            step: {type: String, require: true},
            collaborators: [
                {type: Schema.Types.ObjectId, ref: 'user'}
            ]
        }
    ],
    image: String,
    timeTaken: Number,
})

module.exports = mongoose.model('instruction', InstructionModel)