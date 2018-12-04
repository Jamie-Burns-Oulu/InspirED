const db = require("../database");

const result = {
    getAnswersGivenByInstance(quiz_instance, callback) {
        return db.query(
            "select * from answer_given where quiz_instance=?",
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
