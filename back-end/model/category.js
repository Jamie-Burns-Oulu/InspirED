const db = require("../database");
const category = {
    getAllCategories(callback) {
        db.query("SELECT * FROM category", callback);
    },
    getCategoryById(id, callback) {
        db.query("SELECT * FROM category WHERE id = ?", [id], callback);
    }
};
module.exports = category;
