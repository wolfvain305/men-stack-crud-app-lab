// define out schema for a blog
const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed:{ type: String, require: true},
    description: { type: String, required: true },
    image: String, 
    
})


// compile the blog into a schema
const Dog = mongoose.model('Blog', dogSchema)


// Export the model

modules.exports = Dog