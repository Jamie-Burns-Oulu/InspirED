const db = require("../database");
const login_register = {

    addUser(user, callback) {
        return db.query(
            "insert into user values(?,?,?,?,?,?)",
            [
                user.user_id,
                user.username,
                user.password,
                user.email,            
                user.admin,
                user.picture
            ],
            callback
        );
    },

    getUserByUsername(name, callback) {
        return db.query("select * from user where username=?", [name], callback);
    }


};

module.exports = login_register;
