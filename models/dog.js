require('dotenv').config()
const mongoose = require('mongoose')

console.log(process.env)
console.log(process.env.MONGO_URI)

const dogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed:{ type: String, require: true},
    description: { type: String, required: true },
    goodDog: { type: Boolean, required: true},
})

const Dog = mongoose.model('Dog', dogSchema)

module.exports = Dog

/*
Following class notes and should be deleted later for submission

*/