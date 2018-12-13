var express = require("express");
var router = express.Router();
var user_profile = require("../model/user_profile");
const userAuth = require("../midware/userAuth");
const uniqueResult = require('../midware/uniqueResult');
const jwt = require("jsonwebtoken");

router.get("/i",  userAuth ,function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, data) => {
        if(data) {
            user_profile.getInstanceAndQuizByUserId(data.user.id, (err, rows) => {
                if(err) console.log(err); 
                if(rows) {
                    const uniq = uniqueResult(rows, 'quizid');
                    // console.log(uniq);
                    res.json(uniq);
                }
            });
        }
    });
 });
 router.get("/q",  userAuth ,function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, data) => {
        if(data) {
            user_profile.getCreatedQuizzesByUserId(data.user.id, (err, rows) => {
                if(err) res.json(rows);
                if(rows) {
                    res.json(rows);
                }
            });
        }
    });
 });
 router.get('/data', userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, data) => {
        if(data) {
            user_profile.getUserbyUsername(data.user.username, (err, rows) => {
                if(err) res.json(rows);
                if(rows) {
                    res.json(rows);
                }
            });
        }
    });
});

module.exports = router;
