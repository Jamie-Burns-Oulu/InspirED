var express = require("express");
var router = express.Router();
var login_register = require("../model/login_register");

router.post("/", function(req, res, next) {
    login_register.addUser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

router.get("/:name?", function(req, res, next) {
   login_register.getUserByUsername(req.params.name, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
