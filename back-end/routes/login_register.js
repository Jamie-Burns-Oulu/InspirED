var express = require("express");
var router = express.Router();
var login_register = require("../model/login_register");
const jwt = require('jsonwebtoken');


router.post("/register", function(req, res, next) {
    login_register.addUser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

router.post("/login", function(req, res, next) {
    login_register.getUserByUsername(req.body.username, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            const loggedUser = {
                username: count[0].username,
                id: count[0].id,
                email: count[0].email,
                picture: count[0].picture,
                admin: count[0].admin
            };
            jwt.sign({user: loggedUser }, 'group1', (err, token) => {
                res.json({
                    count,
                    token
                });
            });
            
        }
    });
});

module.exports = router;
