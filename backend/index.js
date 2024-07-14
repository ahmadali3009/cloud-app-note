const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
let connect = require('./connection')
let router = require('./routes/user')
let notesrouter = require("./routes/notes")
const app = express()
const port = 5000

app.use(express.json())
app.use(cors());

connect("mongodb://127.0.0.1:27017/cloudnotes").then(()=>{console.log("connection is connected")}).catch((error)=>{console.log(error)})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/' , router)
app.use('/' , notesrouter)


app.listen(port, () => {
  console.log(`MY cloudnotes listening on port ${port}`)
})