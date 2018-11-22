var express = require("express");
var router = express.Router();
var user_profile = require("../model/user_profile");
const userAuth = require('../midware/userAuth');
const jwt = require('jsonwebtoken');

router.get("/",  userAuth ,function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, data) => {
        if(data) {
            user_profile.getUserByUsername(data.user.username, function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        //     user_profile.getInstancesByUserId(8, function(err, rows) {
        //        if (err) {
        //            res.json(err);
        //        } else {
        //            res.json(rows);
        //        }
        //    });
        }
    });
 });

module.exports = router;