// ============================================
// Database Connection
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});
// ============================================

// ============================================
// CREATE
function add(name) {
    return db.one(`
        insert into users 
            (name)
        values
            ($1)
        returning id    
    `, [name])
}

// ============================================
// RETRIEVE
function getAll() {
    return db.any('select * from users');
}

function getById(id) {
    return db.one('select * from users where id = $1', [id]);
}

// ============================================
// UPDATE
function updateName(id, name) {
    return db.result(`
        update users
            set name=$2
        where id=$1
    `, [id, name]);
}

// ============================================
// DELETE
function deleteById(id) {
    return db.result(`
    delete from users
    where id = $1
    `, [id]);
}

// ============================================

module.exports = {
    add,
    deleteById,
    getAll,
    getById,
    updateName
};
