const db = require("../database");
const quiz_landing = {
    getAttemptedQuizInstances(user_id, callback) {
        db.query(
            "SELECT DISTINCT quiz_id FROM quiz_instance where result < 100 and user_id = ?;",
            user_id,
            callback
        );
    },

    getCompletedQuizInstances(user_id, callback) {
        db.query(
            "SELECT distinct quiz_instance.id AS quiz_instance_id, quiz.name FROM group1.quiz_instance INNER JOIN quiz " +
            "ON quiz_instance.quiz_id = quiz.id WHERE result=100 and quiz_instance.user_id=?;",
            user_id,
            callback
        );
    },

    getNewQuizzes(user_id, callback) {
        db.query("select * FROM quiz WHERE quiz.id NOT IN " + 
        "(SELECT quiz_instance.quiz_id FROM quiz_instance where quiz_instance.user_id=?)", user_id, callback);
    }
};

module.exports = quiz_landing;
