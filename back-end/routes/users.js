var express = require("express");
var router = express.Router();
var users = require("../model/user");

router.get("/:user_id?", function(req, res, next) {
    if (req.params.user_id) {
        users.getUserById(req.params.user_id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        users.getAllUsers(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.post("/", function(req, res, next) {
    users.adduser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

router.delete("/:users_id", function(req, res, next) {
    users.deleteuser(req.params.users_id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put("/:users_id", function(req, res, next) {
    users.updateuser(req.params.users_id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
