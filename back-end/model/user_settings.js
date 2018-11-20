const db = require("../database");

const user_settings = {
    updateEmail(newEmail, user, callback) {
        return db.query(
            "UPDATE user SET email=? WHERE username=?",
            [newEmail],
            [user],
            callback
        );
    },

};

module.exports = user_settings;
