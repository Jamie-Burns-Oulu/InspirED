var express = require("express");
var router = express.Router();
var user_settings = require("../model/user_settings");

router.put("/email", function(req, res, next) {
    user_settings.updateEmail(req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put("/picture", function(req, res, next) {
    user_settings.updatePicture(req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put("/password", function(req, res, next) {
    user_settings.updatePassword(req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;
