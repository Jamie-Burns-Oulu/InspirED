const db = require('../database');

const quiz = {
    getAllQuizzes(callback) {
        db.query('SELECT * FROM quiz', callback);
    },
    getQuizById(id, callback) {
        db.query('SELECT * FROM quiz WHERE id = ?', [id], callback);
    },
    getQuizByQuizInstance(instance, callback) {
        db.query('SELECT * FROM quiz WHERE quiz_instance = ?', [instance], callback);
    },
    getQuizByAnswerGiven(answer_given, callback) {
        db.query('SELECT * FROM quiz WHERE answer_given = ?', [answer_given], callback);
    },
    getQuizByMaterialId(material_id, callback) {
        db.query('SELECT * FROM quiz WHERE material_id = ?', [material_id], callback);
    },
    getQuizzesByCategoryId(id, callback) {
        db.query(
                `SELECT quiz.id AS quizid, quiz.name AS quizname, quiz.category_id AS qcategoryid, 
                quiz.material_id AS qmaterialid, quiz.user_id AS quserid, quiz.difficulty,  
                quiz_instance.id AS instanceid, quiz_instance.user_id AS instanceuserid,
                quiz_instance.quiz_id AS instancequizid, quiz_instance.result AS instanceresult 
                FROM quiz_instance RIGHT JOIN quiz ON quiz_instance.quiz_id = quiz.id WHERE quiz.category_id = ? ORDER BY quiz_instance.result desc`,
                [id], callback);
    },
    getAllQuiz(callback) {
        db.query(
                `SELECT DISTINCT quiz.id AS quizid, quiz.name AS quizname, quiz.category_id AS qcategoryid, 
                quiz.material_id AS qmaterialid, quiz.user_id AS quserid, quiz.difficulty, 
                quiz_instance.id AS instanceid, quiz_instance.user_id AS instanceuserid,
                quiz_instance.quiz_id AS instancequizid, quiz_instance.result AS instanceresult 
                FROM quiz_instance RIGHT JOIN quiz ON quiz_instance.quiz_id = quiz.id `, 
                callback);
    }
    
};
module.exports = quiz;
