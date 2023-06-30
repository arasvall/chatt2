require('dotenv').config()

const app = require('express')();
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const http = require('http').Server(app);

const ioOptions = {
    cors: {
      origin: "*"
    }
  }

const io = require('socket.io')(http, ioOptions);
const ducks = require('./src/router.js');
const schema = require("./src/models/models.js")


//express app
// const app = express()


// app.get('/', (req, res) => {
//     res.json({mssg: 'Hello'})
// })

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/ducks/api/', ducks)

//Connect to DB

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error);
    }
}

//One way to connect to mongoDatabase

// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     http.listen(process.env.PORT, () => {
//         console.log("Connected to DB, Running on port,,,,")
//     });

// })

// .catch((error) => {
//     console.log(error)
// });

connect();


// index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../chatt.html');
  });
  
  let username
  
  //chat messages
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      username = msg.username
  });
});
app.post("/message", async (req, res) => {
    const { chatMsg, username } = req.body;
  
    //add doc to db
    try {
      const messages = await Messages.save({ chatMsg, username });
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


app.get('/message', async (req, res) => {
    try {
        const messages = await schema.Message.find();
        return res.json(messages)
    } catch (err) {
        // If an error occurs, return a 500 error with the error message
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

//listen for requests
http.listen(process.env.PORT, () => {
            console.log("Connected to DB, Running on port,,,,")
});
