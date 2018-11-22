const db = require('../database');
const subject = {
    getAllSubjects(callback) {
        db.query('SELECT * FROM subject', callback);
    },
    getSubjectById(id, callback) {
        db.query('SELECT * FROM subject WHERE id = ?', [id], callback);
    },
    addSubject(name, callback) {
        return db.query(
            "insert into subject (name) values(?)",
            [
                name.name
            ],
            callback
        );
    }
};
module.exports = subject;