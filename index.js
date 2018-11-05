const Todo = require('./models/Todo');
const User = require('./models/User');

// User.getTodosForUser(3)
//     .then(result => { console.log(result); })

// Todo.assignToUser(2, 2)
//     .then(() => {
//         User.getTodosForUser(2)
//         .then(result => { console.log(result); })    
//     })

User.getAll()
    .then(result => { console.log(result); })


    
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

