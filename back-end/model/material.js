const db = require('../database');
const material = {
    getAllMaterials(callback) {
        db.query('SELECT * FROM material', callback);
    },
    getMaterialByCategoryId(category_id, callback) {
        db.query('SELECT * FROM material WHERE category_id = ?', [category_id], callback);
    }
};
module.exports = subject;