const db = require("../database");
const user_settings = {

    updateEmail(info, callback) {
        return db.query(
            "UPDATE user SET email=? WHERE username=?",
            [info.email, info.username],
            callback
        );
    },

    updatePicture(info, callback) {
        return db.query(
            "UPDATE user SET picture=? WHERE username=?",
            [info.picture, info.username],
            callback
        );
    },

    updatePassword(info, callback) {
        return db.query(
            "UPDATE user SET password=? WHERE username=?",
            [info.password, info.username],
            callback
        );
    }

};    

module.exports = user_settings;
