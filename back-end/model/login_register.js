const db = require("../database");
const login_register = {

    addUser(users, callback) {
        return db.query(
            "insert into users values(?,?,?,?,?,?)",
            [
                users.user_id,
                users.username,
                users.password,
                users.email,
                users.picture,
                users.admin
            ],
            callback
        );
    },

    getUserByUsername(name, callback) {
        return db.query("select * from users where username=?", [name], callback);
    }


};

module.exports = login_register;
