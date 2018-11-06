require('dotenv').config();

// const Todo = require('./models/Todo');
const User = require('./models/User');

const beth = new User(2, 'beth');
beth.getTodosForUser()
    .then(result => { console.log(result); })

// const skyler = new User('Skyler the Dog');
// const ahjuma = new User('Ahjuma the Impressive');

// debugger;

// skyler.greet(ahjuma);
// ahjuma.greet(skyler);

// let u = User.findById(1);
// u.name = 'eileeeeeeen';
// u.save();

// User.deleteById('asdfasdfasf')
//     .then(result => { console.log(result); })

// Todo.deleteById(1)
//     .then(result => { console.log(result); })

// User.getTodosForUser(3)
//     .then(result => { console.log(result); })

// Todo.assignToUser(2, 2)
//     .then(() => {
//         User.getTodosForUser(2)
//         .then(result => { console.log(result); }) 
//     })      

// Todo.assignToUser(5, 2)
//     .then(() => {
//         User.getTodosForUser(2)
//         .then(result => { console.log(result); })
//     })       
// Todo.assignToUser(3, 2)
//     .then(() => {
//         User.getTodosForUser(2)
//         .then(result => { console.log(result); })    
//     })           
// Todo.assignToUser(4, 5)
//     .then(() => {
//         User.getTodosForUser(2)
//         .then(result => { console.log(result); })
//     })    
// Todo.assignToUser(1, 5)
//     .then(() => {
//         User.getTodosForUser(2)
//         .then(result => { console.log(result); })    
//     })

// User.getAll()
//     .then(result => { console.log(result); })



// User.getAll()
//     .then(results => {
//         console.log(results);
//         console.log(`yep those were the users. cool.`)
//     })

// User.getById('chris')
//     .then(result => { console.log(result); })

// Todo.getById(2000000)
//     .then(result => { console.log(result); })

// User.add('jeff')
//     .then(result => {
//         console.log(result);
//     })

// Todo.add('walk the chewbacca', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result);
//     })



// User.updateName(6, 'JEEEEEEEEEEEEEEEf')
//     .then(result => {
//         console.log(result);
//     })

// Todo.markCompleted(1)
//     .then(result => {
//         console.log(result);
//     })



// User.deleteById(6)
//     .then(result => {
//         console.log(result.rowCount);
//     })

