const db = require("../database");
const users = {
    getAllUsers(callback) {
        return db.query("SELECT * FROM users", callback);
    },
    getUserById(user_id, callback) {
        return db.query("select * from users where id=?", [user_id], callback);
    },
    adduser: function(users, callback) {
        return db.query(
            "insert into users values(?,?,?,?,?)",
            [users.user_id, users.username, users.password, users.email, users.admin],
            callback
        );
    },
    deleteuser: function(user_id, callback) {
        return db.query(
            "delete from users where id=?",
            [user_id],
            callback
        );
    },
    updateuser: function(user_id, users, callback) {
        return db.query(
            "update users set username=?, password=?, email=?, admin=? where user_id=?",
            [users.username, users.password, users.email, users.admin, user_id],
            callback
        );
    }
};

module.exports = users;
