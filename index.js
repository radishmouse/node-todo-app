require('dotenv').config();

const express = require('express');
const app = express();

// const Todo = require('./models/Todo');
const User = require('./models/User');

// Listen for a GET request
app.get('/', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // res.status(200).json(allUsers);
            res.send(allUsers);
        })
});

app.listen(3000, () => {
    console.log('You express app is ready!');
});



// ===== example of sending a whole page

/*
    User.getAll()
        .then(allUsers => {
            let usersList = ``;
            allUsers.forEach(user => {
                usersList += `<li>${user.name}</li>`
            });
            let thePage = `
              <!doctype>
              <html>
                <head>
                </head>
                <body>
                    <h1>hey</h1>
                    <ul>
                        ${usersList}
                    </ul>
                </body>
              </html>
            `;
            res.send(thePage);
            // console.log(allUsers);
            // res.send(allUsers);
            // res.send(allUsers);
            // res.status(200).json(allUsers);
        })
    // res.send('Hellooooooo Expresssssssssssssuh');
*/
