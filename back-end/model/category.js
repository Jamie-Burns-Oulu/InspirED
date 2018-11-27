const db = require("../database");
const category = {
    getAllCategories(callback) {
        db.query("SELECT * FROM category", callback);
    },
    getCategoryBySubjectId(id, callback) {
        db.query("SELECT * FROM category WHERE subject_id = ?", [id], callback);
    },
    addCategory(category, callback) {
        return db.query(
            "insert into category (subject_id,name) values(?,?)",
            [
                category.subject_id,
                category.name
            ],
            callback
        );
    }
};
module.exports = category;
