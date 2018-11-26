const db = require('../database');
const material = {
    getAllMaterials(callback) {
        db.query('SELECT * FROM material', callback);
    },
    getMaterialByCategoryId(category_id, callback) {
        db.query(
            'SELECT * FROM material INNER JOIN ' + 
            'category ON material.category_id = category.id ' + 
            'WHERE material.category_id = ?', 
            [category_id], callback);
    }
};
module.exports = material;