var express = require("express");
var router = express.Router();
var quiz = require("../model/quiz");
const userAuth = require('../midware/userAuth'),
    jwt = require('jsonwebtoken'),
    uniqueResult = require('../midware/uniqueResult');

router.get('/:id?', userAuth, function(req, res, next)  {
    jwt.verify(req.token, "group1", (err, authData) => { 
        if(authData) {
            if(req.params.id) {
                quiz.getQuizzesByCategoryId(req.params.id, (err, rows) => {
                    if(err) console.log(err);
                    if(rows) {
                        const uniq = uniqueResult(rows);
                        console.log(uniq);
                        res.json(uniq);
                    }
                });
            }
            else {
                quiz.getAllQuiz( (err, rows) => {
                    if(err) console.log(err);
                    if(rows) {
                        const uniq = uniqueResult(rows);
                        console.log(uniq);
                        res.json(uniq);
                    }
                });
            }
        }
    });
});
module.exports = router;
