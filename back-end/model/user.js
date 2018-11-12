const db = require('../database');
const users = {
    getAllUsers(callback) {
        return db.query('SELECT * FROM users', callback);
    }
};

module.exports =  users;

