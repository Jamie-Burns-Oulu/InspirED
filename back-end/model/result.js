const db = require("../database");

const result = {
    getAnswersGivenByInstance(quiz_instance, callback) {
        return db.query(
            // "select * from answer_given where quiz_instance=?",
            `SELECT answer_given.id, answer_given.question_id, answer_given.answer_id, answer_given.question_id,  
            answer_given.quiz_instance, quiz.id AS quizid, quiz.name AS quizname, quiz.material_id AS quizmaterialid FROM answer_given 
            INNER JOIN quiz_instance ON answer_given.quiz_instance = quiz_instance.id  
            RIGHT JOIN quiz ON quiz_instance.quiz_id = quiz.id WHERE answer_given.quiz_instance = ?`,
            [quiz_instance],
            callback
        );
    },
    getQuestions(callback) {
        return db.query("select * from question", callback);
    },
    getAnswers(callback) {
        return db.query("select * from answer", callback);
    },
    setResult(info, callback) {
        return db.query("update quiz_instance set result=? where id=?", [
            info.result,
            info.quiz_instance],
            callback);
    }
};

module.exports = result;
