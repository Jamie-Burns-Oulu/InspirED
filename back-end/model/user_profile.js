const db = require("../database");
const user_profile = {

    getUserbyUsername(username, callback) {
        return db.query('SELECT * FROM user WHERE username=?', [username], callback);
    },
    getInstanceAndQuizByUserId(id, callback) {
        return db.query(
            "SELECT quiz_instance.id, quiz_instance.user_id, quiz_instance.result, quiz_instance.quiz_id AS instancequizid,quiz_instance.date, quiz.id as quizid, quiz.name as quizname, quiz.material_id as quizmaterialid, quiz.user_id as quizuserid, quiz.date as quizdate, quiz.difficulty as quizdifficulty FROM quiz_instance INNER JOIN quiz ON quiz_instance.quiz_id=quiz.id WHERE " +
            "quiz_instance.user_id = ? and quiz_instance.date >= addDate(Now(),-7) and " +
            "quiz_instance.date <= Now() ORDER BY quiz_instance.result desc", 
            [id], callback
        );
    },
    getCreatedQuizzesByUserId(id, callback) {
        return db.query(
            "select * from quiz where user_id = ? and Date >= addDate(Now(),-7) and Date <= Now();", 
            [id], callback
        );
    }
};

module.exports = user_profile;