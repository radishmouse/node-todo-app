// ============================================
// Database Connection

const options = {};
if (process.env.DEBUG) {
    options = {
        query: e => {      
            console.log('QUERY: ', e.query);
            if (e.params) {
                console.log('PARAMS:', e.params);
            }       
        }
    }    
}

const pgp = require('pg-promise')(options);
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});
// ============================================

module.exports = db;