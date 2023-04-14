const express = require('express')

const {
    createChanell,
    getChanells,
    getChanell,
    createMessages
} = require('./controller/controller.js')
// const Chanell = require('../models/models')

const router = express.Router()

//Get all chanells
router.get('/channel/', getChanells)

//Get one chanell
router.get('/channel/:id', getChanell)

//Post a new chanell
router.put('/channel/', createChanell)

//Delete a chanell
router.delete('/channel/:id', (req, res) => {
    res.json({mssg: 'Delete a channel'})
})

// Update a chanell
router.patch('/channel/:id', (req, res) => {
    res.json({mssg: 'Update a channel'})
})

//Create new message
router.post('/chatt', createMessages)

module.exports = router