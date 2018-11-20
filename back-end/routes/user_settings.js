var express = require("express");
var router = express.Router();
var user_settings = require("../model/user_settings");

router.put('/:user', function(req, res, next) {
   user_settings.updateEmail(req.params.user, req.body, function(err, rows) {
     if (err) {
       res.json(err);
     } else {
       res.json(rows);
     }
   });
 });

module.exports = router;
