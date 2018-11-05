// const pgPromise = require('pg-promise');
// const pgp = pgPromise();
const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});


// CREATE
function add(name, completed) {
    return db.one(`insert into todos (name, completed)
        values
            ($1, $2)
        returning id    
    `, [name, completed])
}


// RETRIEVE
// example of grabbing all the rows
function getAll() {
    return db.any('select * from todos');
}
// getAll()
//     .then(results => {
//         console.log(results);
//         console.log(`yep those were the todos. cool.`)
//     })

// example of grabbing one row
function getById(id){
    return db.one(`select * from todos where id = $1`, [id])
        .catch(err => {
            // Got nuthin'
            // console.log('you did not get a todo');
            return {
                name: 'No todo found.'
            };   
        })
}
// getById(2)
//     .then(result => { console.log(result); })

// getById(2000000)
//     .then(result => { console.log(result); })



// add('walk the chewbacca', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result);
//     })

// example of deleting a row
function deleteById(id){
    return db.result(`delete from todos where id = $1`, [id])
}

// UPDATE
// example of updating a row

// DELETE
// deleteById(10)
//     .then(result => {
//         console.log(result.rowCount);
//     })

