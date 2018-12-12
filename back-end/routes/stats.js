const express = require("express");
const router = express.Router();
const stats = require("../model/stats");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.post("/set", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            stats.setStats(function(err, count) {
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

router.get("/get", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            stats.getStats(function(err, count) {
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
