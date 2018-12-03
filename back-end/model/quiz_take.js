const db = require("../database");

const quiz_take = {
    getQuestionByQuizId(quiz_id, callback) {
        return db.query(
            "select * from question where quiz_id=?",
            [quiz_id],
            callback
        );
    },
    getAnswersByQuestionId(question_id, callback) {
      return db.query(
          "select * from answer where question_id=?",
          [question_id],
          callback
      );
   },
   addQuizInstance(info, callback) {
      return db.query(       
       "insert into quiz_instance (user_id, quiz_id, result, date) values(?,?,?,NOW())",
          [
              info.user_id,
              info.quiz_id,
              0,
              info.date
          ],
          callback
      );
  },
  getCreatedQuizInstance(callback) {
      return db.query(
       "select * from quiz_instance ORDER BY id desc limit 1;",
          callback
      );
  },      

};

module.exports = quiz_take;
