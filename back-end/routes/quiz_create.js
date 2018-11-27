const express = require("express");
const router = express.Router();
const quiz_create = require("../model/quiz_create");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            quiz_create.addQuiz(req.body, function(err, count) {
               if (err) {
                    res.json(err);
                } else {
                    res.json(req.body); //or return count for 1 & 0
                }
            });
        } else {
            res.json(err);
        }
    });
});

module.exports = router;
