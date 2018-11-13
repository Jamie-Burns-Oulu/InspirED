const db = require('./database');

class User {
    constructor(username, password, email, admin = 0) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.admin = admin;
    }
    insertInto(callback) {
        return db.query('INSERT INTO users (username, password, email, admin ) VALUES(?,?,?,?)', [this.username, this.password, this.email, this.admin], callback);
    }
};

class Subject {
    constructor(content) {
        this.name = content;
    }
    insertInto(callback) {
        return db.query('INSERT INTO subject (name) VALUES(?)', [this.name], callback);
    }
}
// const newUsr = new User('This is a usernema', '123', 'new@email.com' ); 
//     newUsr.insertInto((err, rows) => {
//         if (err) console.log(err);
//         if(rows) console.log(rows);
//     });
const newSubject = new Subject('Finnish');
    newSubject.insertInto((err, rows) => {
        if (err) console.log(err);
        if(rows) console.log(rows);
    });
    