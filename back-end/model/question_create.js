//question - quiz_id(int), question (text of question), (optional - material_item_id)

const db = require("../database");

const question_create = {
    addQuestion(info, callback) {
        return db.query(
         "insert into question (quiz_id, question) values(?,?)",
            [
                info.quiz_id,
                info.question,
            ],
            callback
        );
    },
    getCreatedQuestion(callback) {
        return db.query(
         "select * from question ORDER BY id desc limit 1;",
            callback
        );
    },      
};  

module.exports = question_create;
