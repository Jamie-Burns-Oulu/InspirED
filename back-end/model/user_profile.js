const db = require("../database");
const user_profile = 
{
    getUserByUsername(name, callback) {
        return db.query("select * from user where username=?", [name], callback);
    },
    
    getInstancesByUserId(id, callback)
    {
        return db.query("SELECT * FROM quiz_instance WHERE user_id=?", [id], callback);
    }
};

module.exports = user_profile;