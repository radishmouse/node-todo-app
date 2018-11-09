require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

// const Todo = require('./models/Todo');
const User = require('./models/User');

const page = require('./views/page');
const userList = require('./views/userList');
const todoList = require('./views/todoList');

app.get('/', (req, res) => {
    const thePage = page('hey there');
    res.send(thePage);
});

// Listen for a GET request
app.get('/users', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // res.status(200).json(allUsers);
            // res.send(allUsers);
            const usersUL = userList(allUsers);
            const thePage = page(usersUL);
            console.log(thePage);
            res.send(thePage);

            // res.send(page(userList(allUsers)));
        });
});

// Listen for POST requests
// Create a new user
app.post('/users', (req, res) => {
    console.log(req);
    // console.log(req.body);
    // res.send('ok');
    const newUsername = req.body.name;
    console.log(newUsername);
    User.add(newUsername)
        .then(theUser => {
            res.send(theUser);
        })
});

// Updating an existing user
// Using POST because HTML Forms can only send GET or POST.
// HTML Form cannot send a PUT (or a DELETE).
// app.post('/users/:id(\\d+)', (req, res) => {
// app.post(/^\/users\/:id(\d+)/, (req, res) => {
app.post('/users/:id([0-9]+)', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    console.log(id);
    console.log(newName);
    // res.send('ok');

    // Get the user by their id
    User.getById(id)
        .then(theUser => {
            // call that user's updateName method
            theUser.updateName(newName)
                .then(result => {
                    if (result.rowCount === 1) {
                        res.send('yeah you did');
                    } else {
                        res.send('💩');
                    }
                });
            
        });
});

// Example of grabbing a user by an
// imaginary "getByName" method.
// app.post('/users/name/:name([A-Z0-9]+)', (req, res) => {
//     const name = req.params.name;
//     const newName = req.body.name;
//     console.log(id);
//     console.log(newName);
//     // res.send('ok');

//     // Get the user by their id
//     User.getByName(name)
//         .then(theUser => {
//             // call that user's updateName method
//             theUser.updateName(newName)
//                 .then(result => {
//                     if (result.rowCount === 1) {
//                         res.send('yeah you did');
//                     } else {
//                         res.send('💩');
//                     }
//                 });
            
//         });
// });











// Match the string "/users/" followed by one or more digits
// REGular EXpressions
// app.get('/users/:id([0-9]+)', (req, res) => {
app.get(`/users/:id(\\d+)`, (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(theUser);
        })
});

app.get(`/users/:id(\\d+)/todos`, (req, res) => {
    User.getById(req.params.id)
        .then(theUser => {
            theUser.getTodos()
                .then(allTodos => {
                    const todosUL = todoList(allTodos);
                    const thePage = page(todosUL);
                    res.send(thePage);
                })
        })
});

app.get('/users/register', (req, res) => {
    res.send('you are on the registration page. no really.');
});

app.get('/users/:id(\\d+)/rename/:newName', (req, res) => {
    User.getById(req.params.id)
        .then(user => {
            user.updateName(req.params.newName)
                .then(() => {
                    res.send('you just renamed them!');
                })
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
