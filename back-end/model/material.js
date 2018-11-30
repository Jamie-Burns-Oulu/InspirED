const db = require('../database');
const material = {
    // getAllMaterials(callback) {
    //     db.query('SELECT material.id, material.name AS material_name, material.user_id, material.date, material.category_id, category.id AS category_id, category.name AS category_name, category.subject_id, subject.id, subject.name AS subject_name FROM material INNER JOIN ' + 
    //     'category ON material.category_id = category.id INNER JOIN subject ON category.subject_id = subject.id ', callback);
    // },
    getAllMaterials(callback) {
        db.query('SELECT * FROM material', callback);
    },
    getAllMaterialItemsByMaterialId(material_id, callback) {
        db.query('SELECT * FROM material_item WHERE material_id=?', [material_id], callback);
    },
    getMaterialByCategoryName(category_name, callback) {
        // console.log(category_name);
            db.query('SELECT material.id, material.name AS material_name, material.user_id, material.date, material.category_id, category.id AS category_id, category.name AS category_name, category.subject_id, subject.id, subject.name AS subject_name FROM material INNER JOIN ' + 
            'category ON material.category_id = category.id INNER JOIN subject ON category.subject_id = subject.id  WHERE category.name = ?',[category_name], callback);
    },
    getAllMaterialCategories(callback) {
        db.query('SELECT material.category_id, category.name, category.subject_id, subject.name FROM material INNER JOIN category ON material.category_id = category.id INNER JOIN subject ON category.subject_id = subject.name', callback);
    },
    addMaterial(material, user_id, callback) {
        db.query('INSERT INTO material(category_id, user_id, name, date) VALUES(?, ?, ?, NOW())', [material.category_id, user_id, material.name], callback);
    }
};
module.exports = material;