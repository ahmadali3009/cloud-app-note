const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const connect = require('./connection');
const router = require('./routes/user');
const notesRouter = require('./routes/notes');

const app = express();
const Port = process.env.PORT || 5000;
const username = process.env.MONGODB_USERNAME || 'ahmedalee3009';
const password = process.env.MONGODB_PASSWORD || 'EX93hwa1KzS2QfJs';
const cluster = process.env.MONGODB_CLUSTER || 'ahmedcluster.rdukguv.mongodb.net';
const dbname = process.env.MONGODB_DBNAME || 'cloudnotes';
console.log("username" , username)
console.log("password" , password)
console.log("cluster" , cluster)
console.log("dbname" , dbname)


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  // origin: process.env.FRONTEND_URL || 'https://cloud-note-frontend.onrender.com',
  credentials: true,
  // Allow requests only from this origin
}));

const mongoURI = "mongodb+srv://ahmedalee3009:EX93hwa1KzS2QfJs@ahmedcluster.rdukguv.mongodb.net/cloudnotes?retryWrites=true&w=majority" || process.env.mongoURI;

mongoose.connect(mongoURI, {
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', router);
app.use('/', notesRouter);

app.listen(Port, () => {
  console.log(`MY cloudnotes listening on port ${Port}`);
});
