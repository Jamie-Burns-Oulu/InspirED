const db = require("../database");
const quiz_landing = {
    getAttemptedQuizInstances(user_id, callback) {
        db.query(
            "SELECT * FROM quiz_instance where user_id=?",
            user_id,
            callback
        );
    },

    getCompletedQuizInstances(user_id, callback) {
        db.query(
            "SELECT COUNT (*) FROM quiz_instance where result = 100 AND user_id = ?",
            user_id,
            callback
        );
    },

    getNewQuizzes(user_id, callback) {
        db.query("SELECT id FROM quiz", user_id, callback);
    }
};

module.exports = quiz_landing;
