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
        // db.query('SELECT * FROM material_item WHERE material_id=?', [material_id], callback);
        db.query(
            // `SELECT material_item.id, material_item.content, quiz.id AS quizid, quiz.material_id 
            // AS quizmaterialid, quiz.name AS quizname, quiz.difficulty AS quizdifficulty FROM material_item 
            // LEFT JOIN quiz ON material_item.material_id = quiz.material_id WHERE material_item.material_id=?`, 
            `SELECT material_item.id, material_item.content, quiz.id AS quizid, quiz.material_id 
            AS quizmaterialid, quiz.name AS quizname, quiz.difficulty AS quizdifficulty, material.name 
            AS materialname, user.id AS userid, user.username AS username, quiz_instance.id AS instanceid, quiz_instance.result AS instanceresult FROM material_item 
            LEFT JOIN quiz ON material_item.material_id = quiz.material_id INNER JOIN material ON 
            material_item.material_id = material.id LEFT JOIN user ON material.user_id = user.id LEFT JOIN 
            quiz_instance ON quiz.id = quiz_instance.quiz_id WHERE material_item.material_id=?`,
            [material_id], callback);
    },
    getMaterialByCategoryId(id, callback) {
        db.query('SELECT * FROM material WHERE category_id = ?', [id], callback);
    },
    getMaterialByCategoryName(category_name, callback) {
        db.query('SELECT material.id, material.name AS material_name, material.user_id, material.date, material.category_id, category.id AS category_id, category.name AS category_name, category.subject_id, subject.id AS subject_id, subject.name AS subject_name FROM material INNER JOIN ' + 
        'category ON material.category_id = category.id INNER JOIN subject ON category.subject_id = subject.id  WHERE category.name = ?',[category_name], callback);
    },
    getAllMaterialCategories(callback) {
        db.query('SELECT material.category_id, category.name, category.subject_id, subject.name FROM material INNER JOIN category ON material.category_id = category.id INNER JOIN subject ON category.subject_id = subject.name', callback);
    },
    addMaterial(material, user_id, callback) {
        db.query('INSERT INTO material(category_id, user_id, name, date) VALUES(?, ?, ?, NOW())', [material.category_id, user_id, material.name], callback);
    },
    addMaterialItem(material, callback) {
        db.query('INSERT INTO material_item (material_id, content) VALUES(?,?)', [material.materialid, material.content], callback);
    },
    updateItem(item, callback) {
        db.query('UPDATE material_item SET content = ? WHERE id = ?', [item.txt, item.id], callback);
    }
};
module.exports = material;