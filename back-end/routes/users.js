var express = require("express");
var router = express.Router();
var user = require("../model/user");

router.get("/:user_id?", function(req, res, next) {
    if (req.params.user_id) {
        user.getUserById(req.params.user_id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        user.getAllUsers(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.post("/", function(req, res, next) {
    user.adduser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

router.delete("/:users_id", function(req, res, next) {
    user.deleteuser(req.params.users_id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put("/:users_id", function(req, res, next) {
    user.updateuser(req.params.users_id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
