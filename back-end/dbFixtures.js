const db = require("./database");

class User {
    constructor(username, password, email, admin = 0, picture) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.admin = admin;
        this.picture = picture;
    }
    insertInto(callback) {
        return db.query(
            "INSERT INTO user (username, password, email, admin, picture ) VALUES(?,?,?,?,?)",
            [
                this.username,
                this.password,
                this.email,
                this.admin,
                this.picture
            ],
            callback
        );
    }
}

class Subject {
    constructor(content) {
        this.name = content;
    }
    insertInto(callback) {
        return db.query(
            "INSERT INTO subject (name) VALUES(?)",
            [this.name],
            callback
        );
    }
}
class Stats {
    constructor(subject_id, user_id, points = 0) {
        this.subject_id = subject_id;
        this.user_id = user_id;
        this.points = points;
    }
    insertInto(callback) {
        return db.query(
            "INSERT INTO stats (subject_id, user_id, points) VALUES(?,?,?)",
            [this.subject_id, this.user_id, this.points],
            callback
        );
    }
}
class Quiz {
    constructor(name, material_id, category_id) {
        this.name = name;
        this.material_id = material_id;
        this.category_id = category_id;
    }
    insertInto(callback) {
        return db.query(
            "INSERT INTO quiz (name, material_id, category_id) VALUES(?,?,?)",
            [this.name, this.material_id, this.category_id],
            callback
        );
    }
}
class Material {
    constructor(category_id) {
        this.category_id = category_id;
    }
    insertInto(callback) {
        return db.query(
            "INSERT INTO material (category_id) VALUES(?)",
            [this.category_id],
            callback
        );
    }
}
class Category {
    constructor(subject_id, name) {
        this.subject_id = subject_id;
        this.name = name;
    }
    insertInto(callback) {
        return db.query(
            "INSERT into category (subject_id, name) VALUES(?,?)",
            [ this.subject_id, this.name],
            callback
        );
    }
}

// const finnishGrammar = new Category('1', 'Grammar');
// finnishGrammar.insertInto((err, rows) => {
//     if (err) console.log(err);
//     if (rows) console.log(rows);
// });
const buisnessAccounting = new Category('2', 'Accounting');
buisnessAccounting.insertInto((err, rows) => {
    if (err) console.log(err);
    if (rows) console.log(rows);
});
// const newSubject = new Subject("Business");
// newSubject.insertInto((err, rows) => {
//     if (err) console.log(err);
//     if (rows) console.log(rows);
// });

// const newUsr = new User('user', '123', 'user@email.com', 0, 'picture' );
//     newUsr.insertInto((err, rows) => {
//         if (err) console.log(err);
//         if(rows) console.log(rows);
//     });
// const newSubject = new Subject('Finnish');
//     newSubject.insertInto((err, rows) => {
//         if (err) console.log(err);
//         if(rows) console.log(rows);
//     });
// const stat = new Stats(1, 1).insertInto((err, rows) => {
//     if (err) console.log(err);
//     if(rows) console.log(rows);
// });

//after adding fixtures, this exits node in the terminal so you don't have to press CTRL + C
//process.exit();
