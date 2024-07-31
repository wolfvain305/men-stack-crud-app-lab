require('dotenv').config()
const express = require ('express')
const app = express()
const Dog = require('./models/dog.js')
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

app.use(express.json())

mongoose.connect(MONGO_URI)

mongoose.connection.once('open' , () => {
    console.log('Connection with Mongo is established')
})

mongoose.connection.on('error', () => {
    console.log('Mongo is trippin!')
})

// Index
app.get('/dogs', async (req, res) => {
    try {
        const foundDogs = await Dog.find({})
        res.json(foundDogs)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message})
    }
})


/*-------------------------------- Functions needed to be Added --------------------------------*/
//New
//Update
//Create
app.post('/dogs', async (req,res) => {
    try {
        const createdDog = await Dog.create(req.body)
        res.json(createdDog)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message})
    }
})
// Edit
// Show

app.listen(3000, () => console.log('I see connected apps'))

