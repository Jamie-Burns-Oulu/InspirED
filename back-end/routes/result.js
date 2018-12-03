const express = require("express");
const router = express.Router();
const result = require("../model/result");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.get("/instance/:id?", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if (req.params.id) {
                result.getAnswersGivenByInstance(req.params.id, (err, rows) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(rows);
                    }
                });
            }
        }
    });
});

router.get("/questions", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            result.getQuestions((err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        }
    });
});

router.get("/answers", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            result.getAnswers((err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        }
    });
});

router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if(req.body){
                result.setResult(req.body, (err, rows) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(req.body);
                    }
                });
            }
        }
    });
 });


module.exports = router;
