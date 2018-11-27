var express = require("express");
var router = express.Router();
var quiz = require("../model/quiz");

router.get("/:id?", function(req, res, next) {
   if (req.params.id) {
       quiz.getQuizById(req.params.id, function(err, rows) {
           if (err) {
               res.json(err);
           } else {
               res.json(rows);
           }
       });
   } else {
       quiz.getAllQuizzes(function(err, rows) {
           if (err) {
               res.json(err);
           } else {
               res.json(rows);
           }
       });
   }
});

module.exports = router;
