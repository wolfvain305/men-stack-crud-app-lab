require('dotenv').config()
const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const Dog = require('./models/dog.js')
const logger = require('morgan')
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(logger('tiny'))
app.use(methodOverride('_method'))

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
    console.log(req.body.hasOwnProperty('text'))
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

//Create End

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

// Index and Show End

//Update
app.put('/dogs/:id', async (req, res) => {
    try {
        const updateDog = await Dog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
        res.json(updateDog)
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})

app.put('/dogs/:id', async (req, res) => {
    req.body.isRead === 'on' || req.body.isRead === true?
    req.body.isRead = true :
    req.body.isRead = false
    try {
        const updatedDog = await Dog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
        res.redirect(`/dogs/${updatedDog._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})

//Update End

app.get('/dogs/:id', async (req, res) => {
    try {
        const foundDog = await Dog.findOne({ _id: req.params.id })
        res.render('edit.ejs') , {
            dog: foundDog
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

// Delete

app.delete('/dogs/:id', async (req, res) => {
    try {
        await Dog.findOneAndDelete({ _id: req.params.id })
        .then((dog) => {
            res.redirect('/dog')
        })
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
    
})

// Delete End

app.listen(3000, () => console.log('I see connected apps'))

