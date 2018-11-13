require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./models/db');
app.use(session({
    store: new pgSession({
        pgPromise: db
    }),
    secret: 'abc123kasfsdbukbfrkqwuehnfioaebgfskdfhgcniw3y4fto7scdghlusdhbv',
    saveUninitialized: false
}));

app.use(express.static('public'));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

// const Todo = require('./models/Todo');
const User = require('./models/User');
// const bcrypt = require('bcrypt');

const page = require('./views/page');
const userList = require('./views/userList');
const todoList = require('./views/todoList');
const userForm = require('./views/userForm');
const registrationForm = require('./views/registrationForm');
const loginForm = require('./views/loginForm');


app.get('/', (req, res) => {
    const thePage = page('hey there');
    res.send(thePage);
});

// ========================================================
// ALL USERS
// ========================================================
// Retrieve all users
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


// ========================================================
// User Registration
// ========================================================

app.get('/register', (req, res) => {
    // Send them the signup form
    const theForm = registrationForm();
    const thePage = page(theForm);
    res.send(thePage);
    // res.send(page(registrationForm()));
});
app.post('/register', (req, res) => {
    // Process the signup form
    // 1. Grab the values out of req.body
    const newName = req.body.name;
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    console.log(newName);
    console.log(newUsername);
    console.log(newPassword);
    // 2. Call User.add
    User.add(newName, newUsername, newPassword)
        .then(newUser => {
            // 3. If that works, redirect to the welcome page
            res.redirect('/welcome');
        });
});
app.get('/welcome', (req, res) => {
    // Send them the welcome page
    console.log(req.session.user);
    res.send(page(`<h1>Hey ${req.session.user.username}</h1>`));
})

// ========================================================
// User Login
// ========================================================
app.get('/login', (req, res) => {
    // Send them the login form
    const theForm = loginForm();
    const thePage = page(theForm);
    res.send(thePage);
});
app.post('/login', (req, res) => {
    // Process the login form
    // 1. Grab values from form
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    // 2. Find a user whose name
    // matches `theUsername`
    User.getByUsername(theUsername)
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        .then(theUser => {
            // const didMatch = bcrypt.compareSync(thePassword, theUser.pwhash);
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                res.redirect('/welcome');
            } else {
                res.redirect('/login');
            }
        })
    // 3. If I find a. user
    // then, check to see if
    // the password matches

    // 4. 

});

// ========================================================
// Retrieve one user's info
app.get('/users/:id([0-9]+)', (req, res) => {
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

// ========================================================
// Retrieve all todos for a user
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


// ========================================================
// GET the form for editing one user's info
app.get('/users/:id([0-9]+)/edit', (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(page(userForm(theUser)));
        })
});

// ========================================================
// Process the form for editing one user's info
app.post('/users/:id([0-9]+)/edit', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    // Get the user by their id
    User.getById(id)
        .then(theUser => {
            // call that user's updateName method
            theUser.updateName(newName)
                .then(didUpdate => {
                    if (didUpdate) {
                        // res.send('yeah you did');
                        // res.redirect(`/users/${id}/edit`);
                        res.redirect(`/users/`);
                    } else {
                        res.send('💩');
                    }
                });            
        });
});


// ========================================================

app.listen(3000, () => {
    console.log('You express app is ready!');
});
