require('dotenv').config();

const express = require('express');
const app = express();

// const Todo = require('./models/Todo');
const User = require('./models/User');

// Listen for a GET request
app.get('/', (req, res) => {
    res.send('Hellooooooo Expresssssssssssssuh');
});

app.listen(3000, () => {
    console.log('You express app is ready!');
});
