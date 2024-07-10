const mysql = require('mysql2/promise');
const envVariables = require('./config.js');

const pool = mysql.createPool({
    host: envVariables.db.host,
    user: envVariables.db.user,
    password: envVariables.db.password,
    database: envVariables.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
