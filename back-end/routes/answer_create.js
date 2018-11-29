const express = require("express");
const router = express.Router();
const answer_create = require("../model/answer_create");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            var answers = [];
            var correct = 0;
            for (i in req.body.answers) {
                if (req.body.answerCheck === i) {
                    correct = 1;
                } else {
                    correct = 0;
                }
                answers.push([
                    req.body.questionId,
                    req.body.answers[i].answer,
                    correct
                ]);
            }
            answer_create.addAnswers(answers, function(err, count) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(answers); //or return count for 1 & 0
                }
            });
        } else {
            res.json(err);
        }
    });
});

module.exports = router;
