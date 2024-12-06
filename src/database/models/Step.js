const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StepModel = new Schema({
    step: {type: String, require: true},
    collaborators: [
        {type: Schema.Types.ObjectId, ref: 'user'}
    ]
})

module.exports = mongoose.model('step', StepModel)