const { Chanell } = require('../models/models.js')
const { Messages } = require('../models/models.js')
const mongoose = require('mongoose')

//Get all chanell
const getChanells = async (req, res) => {
  
  const chanells = await Chanell.find({}).sort({createdAt: -1})
  

  res.status(200).json(chanells)
}
//Get one channel
const getChanell = async (req, res) => {
  const { id } = req.params
  const chanell = await chanell.findById(id)
  if (!chanell) {    
    return res.status(404).json({error: 'Cant find the channel'})
  }

  res.status(200).json(chanell)
}

//Create new chanell
const createChanell = async (req, res) => {
  const {name, content} = req.body

  //add doc to db
    try {
        const chanell = await Chanell.create({name, content})
        res.status(200).json(chanell)

    } catch (error) {
        res.status(400).json({error: error.message})

    }
}



//Delete a chanell

//Update a chanell

//Create new messages
const createMessages = async (req, res) => {
  const {chatMsg, username} = req.body

  //add doc to db
    try {
        const messages = await Messages.save({chatMsg, username})
        res.status(200).json(messages)

    } catch (error) {
        res.status(400).json({error: error.message})

    }
}


module.exports = {
  getChanells,
  getChanell,
  createChanell,
  createMessages
}
