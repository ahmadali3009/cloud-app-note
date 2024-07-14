const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const connect = require('./connection');
const router = require('./routes/user');
const notesRouter = require('./routes/notes');

const app = express();
const port = process.env.PORT || 5000;
const username = process.env.MONGODB_USERNAME;
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;
const dbname = process.env.MONGODB_DBNAME;

app.use(express.json());
app.use(cors());

const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`;

connect(mongoURI)
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

app.listen(port, () => {
  console.log(`MY cloudnotes listening on port ${port}`);
});
