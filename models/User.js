const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// declare a class named "User"
class User {
    // what properties should
    // a user start off with?
    // `constructor` is a method
    // that is automatically 
    // called when you create a user
    constructor(id, name, username, pwhash) {
        // define properties that
        // are also the names
        // of the database columns
        this.id = id;
        this.name = name;
        this.username = username;        
        this.pwhash = pwhash;        
    }

    // CREATE
    static add(name, username, password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return db.one(`
            insert into users 
                (name, username, pwhash)
            values
                ($1, $2, $3)
            returning id`, [name, username, hash])
            .then(data => {
                const u = new User(data.id, name, username);
                return u;
            });
    }


    

    // RETRIEVE
    static getAll() {
        return db.any(`
            select * from users order by id
        `).then(userArray => {
            // transform array of objects
            // into array of User instances
            const instanceArray = userArray.map(userObj => {
                const u = new User(userObj.id, userObj.name);
                return u;
            });
            return instanceArray;
        })
    }

    static getById(id) {
        return db.one('select * from users where id = $1', [id])
            .then(result => {
                const u = new User(result.id, result.name);
                return u;
            })
            // .catch(err => {
            //     return err;
            // })
    }

    static getByUsername(username) {
        return db.one(`
            select * from users
            where username ilike '%$1:raw%'          
        `, [username]).then(result => {
            return new User(result.id, result.name, result.username,result.pwhash);
        })
    }

    static searchByName(name) {
        return db.any(`
            select * from users
                where name ilike '%$1:raw%'
        `, [name])
    }
    
    getTodos() {
        return db.any(`
            select * from todos
                where user_id = $1
        `, [this.id]);
    }

    passwordDoesMatch(thePassword) {
        const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
        return didMatch;
    }

    // UPDATE
    updateName(name) {
        this.name = name;
        return db.result(`
            update users
                set name=$2
            where id=$1
        `, [this.id, name])
        .then(result => {
            return result.rowCount === 1;

            // same same, but version above is better.
            // if (result.rowCount === 1) {
            //     return true;
            // } else {
            //     return false;
            // }
        })
    }

    // DELETE
    delete(){
        return db.result(`
        delete from users
        where id = $1
        `, [this.id]);        
    }

    static deleteById(id) {
        return db.result(`
        delete from users
        where id = $1
        `, [id]);
    }


    // // a method is a function "belongs"
    // // to an object
    greet(otherUser) {
        console.log(`Hello ${otherUser.name}, I am ${this.name}`);
    }
}











// ============================================
// CREATE
// function add(name) {
//     return db.one(`
//         insert into users 
//             (name)
//         values
//             ($1)
//         returning id    
//     `, [name])
// }

// // ============================================
// RETRIEVE
// function getAll() {
//     return db.any(`
//         select  
//             users.id,
//             users.name,
//             t.name as todo,
//             t.completed as completed
//         from 
//             users
//             left join todos t
//             on users.id = t.user_id
//     `);
// }

// function getById(id) {
//     return db.one('select * from users where id = $1', [id]);
// }

// function getTodosForUser(id) {
//     return db.any(`
//         select * from todos
//             where user_id = $1
//     `, [id]);
// }

// ============================================
// UPDATE
// function updateName(id, name) {
//     return db.result(`
//         update users
//             set name=$2
//         where id=$1
//     `, [id, name]);
// }

// ============================================
// DELETE
// function deleteById(id) {
//     return db.result(`
//     delete from users
//     where id = $1
//     `, [id]);
// }

// ============================================

module.exports = User;
// module.exports = {
//     add,
//     deleteById,
//     getAll,
//     getById,
//     getTodosForUser,
//     updateName,
//     User
// };
