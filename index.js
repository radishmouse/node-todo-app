// const pgPromise = require('pg-promise');
// const pgp = pgPromise();
const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});

// example of grabbing all the rows
// db.any('select * from todos')
//     .then(results => {
//         console.log(results);
//     })

// example of grabbing one row
function getById(id){
    return db.one(`select * from todos where id = ${id}`)
        .catch(err => {
            // Got nuthin'
            // console.log('you did not get a todo');
            return {
                name: 'No todo found.'
            };   
        })
}

getById(2)
    .then(result => {
        console.log(result);
    })

getById(2000000)
    .then(result => {
        console.log(result);
    })



// example of adding a row

// example of updating a row

// example of deleting a row