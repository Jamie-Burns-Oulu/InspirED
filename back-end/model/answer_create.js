const db = require("../database");

//answer - question_id(int), answer (text of answer), correct_answer(tiny-int)
const answer_create = {
    addAnswers(answers, callback) {
        return db.query(
         "insert into answer (question_id, answer, correct_answer) values ?",
            [
                answers
            ],
            callback
        );
    },

};  

module.exports = answer_create;
