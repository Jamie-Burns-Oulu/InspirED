const db = require("../database");
const user = {
    getAllUsers(callback) {
        return db.query("SELECT * FROM user", callback);
    },
    getUserById(user_id, callback) {
        return db.query("select * from user where id=?", [user_id], callback);
    },
    adduser(user, callback) {
        return db.query(
            "insert into user values(?,?,?,?,?)",
            [user.user_id, user.username, user.password, user.email, user.admin],
            callback
        );
    },
    deleteuser(user_id, callback) {
        return db.query(
            "delete from user where id=?",
            [user_id],
            callback
        );
    },
    updateuser(user_id, user, callback) {
        return db.query(
            "update user set username=?, password=?, email=?, admin=? where user_id=?",
            [user.username, user.password, user.email, user.admin, user_id],
            callback
        );
    },
    updatePassword(password, user_id, callback) {
        return db.query(
            "update user set password=? where user_id=?",
            [password, user_id],
            callback
        );
    },
    updateEmail(email, user_id, callback) {
        return db.query(
            "update user set email=? where user_id=?",
            [email, user_id],
            callback
        );
    },
    updatePicture(picture, user_id, callback) {
        return db.query(
            "update user set picture=? where user_id=?",
            [picture, user_id],
            callback
        );
    }
};

module.exports = user;
