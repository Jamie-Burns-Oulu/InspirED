var express = require("express");
var router = express.Router();
var user_profile = require("../model/user_profile");

router.get("/:name?", function(req, res, next) {
    
    user_profile.getUserByUsername(req.params.name, function(err, rows) {
         if (err) {
             res.json(err);
         } else {
             res.json(rows);
         }
     });

     user_profile.getInstancesByUserId(8, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
 });

module.exports = router;