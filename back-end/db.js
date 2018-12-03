var mysql = require("mysql");

//User must register via site;

//Tables
//answer, answer_given, category, material, material_item, question,
//quiz, quiz_instance, report, stats, subject, user;

var con = mysql.createConnection({
    host: "localhost",
    user: "netuser",
    password: "netpass",
    database: "group1"
});


//Subject = name;
function subject() {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO subject (name) VALUES ?";
        var values = [
            ["Finnish"],
            ["English"],
            ["Maths"],
            ["Physics"],
            ["Python"],
            ["JavaScript"]
        ];
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of subjects inserted: " + result.affectedRows);
        });
    });
}

//Category = name, subject_id;
function category() {
   con.connect(function(err) {
       if (err) throw err;
       var sql = "INSERT INTO category (name, subject_id) VALUES ?";
       var values = [
           ["Vocabulary",'1'],
           ["Grammar", '1'],
       ];
       con.query(sql, [values], function(err, result) {
           if (err) throw err;
           console.log("Number of categories inserted: " + result.affectedRows);
       });
   });
}

//Quiz = name, material_id, category_id
function quiz() {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT into QUIZ (name, category_id) VALUES ?";
        var values = [
            ["Basic Vocabulary Quiz", '1'],
            ["Advanced Vocabulary Quiz", '1']
        ];
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of quizzes inserted " + result.affectedRows);
        });
        
    });
 }

//Question = question, quiz_id, difficulty, material_item_id
function question() {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT into QUESTION (question, quiz_id, difficulty) VALUES ?";
        var values = [
            ["What is the word for Friday in Finnish?", '1', '1'],
        ];
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of questions inserted " + result.affectedRows);
        });
        
    });
 }

//Answer = question_id, answer, correct_answer 
function answer() {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT into ANSWER (question_id, answer, correct_answer ) VALUES ?";
        var values = [
            ['1', 'Friday', '0'],
            ['1', 'perjantai', '1'],
            ['1', 'maanantai', '0']
        ];
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of answers inserted " + result.affectedRows);
        });
        
    });
 }


//Quiz_Instance = user_id, quiz_id, result, date;
function quiz_instance() {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT into quiz_instance (user_id, quiz_id, result) VALUES ?";
        var values = [
            ['8', '7', '90'],
            ['8', '7', '80'],
            ['8', '7', '100']
        ];
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of quiz_instances inserted " + result.affectedRows);
        });
        
    });
 }


//add to return from below 
//subject(), category(), quiz(), question(), answer(), quiz_instance()

return quiz_instance();

