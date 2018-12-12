const db = require("../database");
const user_profile = {

    getUserbyUsername(username, callback) {
        return db.query('SELECT * FROM user WHERE username=?', [username], callback);
    },
    getInstanceAndQuizByUserId(id, callback) {
        return db.query(
            "SELECT * FROM quiz_instance INNER JOIN quiz ON quiz_instance.quiz_id=quiz.id WHERE " +
            "quiz_instance.user_id = ? and quiz_instance.date >= addDate(Now(),-7) and " +
            "quiz_instance.date <= Now();", 
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