const db = require("../database");
const quiz_landing = {
    getAttemptedQuizInstances(user_id, callback) {
        db.query(
            "SELECT DISTINCT quiz_instance.quiz_id, quiz_instance.id, quiz.name, category.name as category_name, subject.name as subject_name FROM quiz_instance " +
                "INNER JOIN quiz ON quiz_instance.quiz_id = quiz.id inner join category on quiz.category_id = category.id " +
                "inner join subject on category.subject_id = subject.id where quiz_id not in" +
                "(SELECT quiz_id FROM quiz_instance where user_id=? and result=100) and quiz_instance.user_id = ? and result < 100 group by quiz_id;",
            [user_id, user_id],
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
        db.query(
            "select quiz.name as quiz_name, quiz.id as quiz_id, category.name as category_name, subject.name as subject_name FROM quiz inner join category on quiz.category_id = category.id " +
                "inner join subject on category.subject_id = subject.id WHERE quiz.id NOT IN " +
                "(SELECT quiz_instance.quiz_id FROM quiz_instance where quiz_instance.user_id=?)",
            user_id,
            callback
        );
    }
};

module.exports = quiz_landing;
