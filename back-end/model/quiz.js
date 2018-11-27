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
    }
};
module.exports = quiz;