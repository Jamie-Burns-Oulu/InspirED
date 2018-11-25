const db = require("../database");
const user_profile = {

    getInstanceAndQuizByUserId(id, callback) {
        return db.query(
            "SELECT * FROM quiz_instance INNER JOIN quiz ON " +
            "quiz_instance.id=quiz.id WHERE quiz_instance.user_id=?", 
            [id], callback
        );
    }
};

module.exports = user_profile;