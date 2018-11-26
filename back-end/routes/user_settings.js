var express = require("express");
var router = express.Router();
var user_settings = require("../model/user_settings");
const userAuth = require("../midware/userAuth");
const jwt = require("jsonwebtoken");

router.put("/email", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if (req.body) {
                user_settings.updateEmail(req.body, function(err, rows) {
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

router.put("/picture", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if (req.body) {
                user_settings.updatePicture(req.body, function(err, rows) {
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

router.put("/password", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if (req.body) {
                user_settings.updatePassword(req.body, function(err, rows) {
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

module.exports = router;
