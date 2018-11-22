const db = require('../database');
const subject = {
    getAllSubjects(callback) {
        db.query('SELECT * FROM subject', callback);
    },
    getSubjectById(id, callback) {
        db.query('SELECT * FROM subject WHERE id = ?', [id], callback);
    },
    addSubject(name, callback) {
        db.query('INSERT INTO subject(name) VALUES(?)', [name], callback);
    }
};
module.exports = subject;