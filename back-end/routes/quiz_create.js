const express = require("express");
const router = express.Router();
const quiz_create = require("../model/quiz_create");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        console.log(req.body);
        if (authData) {
            quiz_create.addQuiz(req.body, function(err, count) {
               if (err) {
                   console.log(err);
                    res.json(err);
                } else {
                    console.log('all okay');
                    res.json(req.body); //or return count for 1 & 0
                }
            });
        } else {
            res.json(err);
        }
    });
});
router.get("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            quiz_create.getCreatedQuiz(function(err, count) {
               if (err) {
                    res.json(err);
                } else {
                    res.json(count); //or return count for 1 & 0
                }
            });
        } else {
            res.json(err);
        }
    });
});
router.get("/checkQuizName/:id?", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            quiz_create.checkQuizName(req.params.id, function(err, count) {
               if (err) {
                    res.json(err);
                } else {
                    res.json(count); //or return count for 1 & 0
                }
            });
        } else {
            res.json(err);
        }
    });
});

module.exports = router;
