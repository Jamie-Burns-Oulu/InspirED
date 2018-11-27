const db = require("../database");

const quiz_create = {

    addQuiz(info, callback) {
        return db.query(
         "insert into quiz (category_id, user_id, name) values(?,?,?)",
            [
                info.category_id,
                info.user_id,
                info.name,             
            ],
            callback
        );
    },    
};  

module.exports = quiz_create;
