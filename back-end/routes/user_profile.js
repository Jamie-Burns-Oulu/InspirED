var express = require("express");
var router = express.Router();
var user_profile = require("../model/user_profile");
const userAuth = require('../midware/userAuth');
const jwt = require('jsonwebtoken');

router.get("/",  userAuth ,function(req, res, next) {
    
    jwt.verify(req.token, 'group1', (err, data) => {
        if(data) {
            user_profile.getInstanceAndQuizByUserId(data.user.id, (err, rows) => {
                if(err) res.json(rows);
                if(rows) {
                    res.json({
                        user: data.user,
                        instances: rows
                    });
                }
            });
        }
    });
 });

module.exports = router;