const express = require("express");
const router = express.Router();
const question_create = require("../model/question_create");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            question_create.addQuestion(req.body, function(err, count) {
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
router.get("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            question_create.getCreatedQuestion(function(err, count) {
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
