require('dotenv').config()
const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const Dog = require('./models/dog.js')
const logger = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(logger('tiny'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open' , () => {
    console.log('Connection with Mongo is established')
})

mongoose.connection.on('error', () => {
    console.log('Mongo is trippin!')
})

/*-------------------------------- controller & router logic --------------------------------*/

//Create
app.post('/dogs', async (req,res) => {
    req.body.isRead === 'on' || req.body.isRead === true?
    req.body.isRead = true :
    req.body.isRead = false
    try {
        const createdDog = await Dog.create(req.body)
        res.redirect('/dogs${creadtedDog._id}')
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})
// Index and Show
app.get('/dogs', async (req, res) => {
    try {
        const foundDogs = await Dog.find({})
        res.render('index.ejs'), {
            dogs: foundDogs
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message})
    }
})

app.get('/dogs/:id', async (req, res) => {
    try {
        const foundDog = await Dog.findOne({ _id: req.params.id })
        res.render('show.ejs') , {
            dog: foundDog
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

//Update
app.put('/dogs/:id', async (req, res) => {
    try {
        const updateDog = await Dog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
        res.json(updateDog)
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})

// Delete
app.delete('/dogs/:id', async (req, res) => {
    try {
        await Dog.findOneAndDelete({ _id: req.params.id })
        .then((dog) => {
            res.status(204)
        })
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
    
})
app.listen(3000, () => console.log('I see connected apps'))

