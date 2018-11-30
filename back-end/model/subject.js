const db = require('../database');
const subject = {
    // getAllSubjects(callback) {
    //     db.query('SELECT * FROM subject', callback);
    // },
     getAllSubjects(callback) {
        db.query('SELECT subject.id AS subjectid, subject.name AS subjectname, category.id AS categoryid, category.subject_id AS catsubid, category.name AS categoryname FROM subject LEFT JOIN ' + 
        'category ON subject.id = category.subject_id', callback);
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