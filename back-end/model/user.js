const db = require('../database');
const users = {
    getAllUsers(callback) {
        return db.query('SELECT * FROM users', callback);
    },
    getUserByUsername(username, callback) {
        return db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },
};

module.exports =  users;

