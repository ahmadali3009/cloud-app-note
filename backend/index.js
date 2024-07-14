const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
let connect = require('./connection')
let router = require('./routes/user')
let notesrouter = require("./routes/notes")
const app = express()
const port = 5000
const username = 'ahmedalee3009';
const password = encodeURIComponent('EX93hwa1KzS2QfJs'); // Use encodeURIComponent to automatically URL encode the password
const cluster = 'ahmedcluster.rdukguv.mongodb.net';
const dbname = 'cloudnotes'; // Replace with your database name

app.use(express.json())
app.use(cors());

connect(`mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority
`).then(()=>{console.log("connection is connected")}).catch((error)=>{console.log(error)})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/' , router)
app.use('/' , notesrouter)


app.listen(port, () => {
  console.log(`MY cloudnotes listening on port ${port}`)
})