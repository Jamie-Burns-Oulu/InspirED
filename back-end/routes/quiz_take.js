const express = require("express");
const router = express.Router();
const quiz_take = require("../model/quiz_take");
const jwt = require("jsonwebtoken");
const userAuth = require("../midware/userAuth");

router.get("/questions/:id?", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if (req.params.id) {
                quiz_take.getQuestionByQuizId(req.params.id, (err, rows) => {
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


router.get("/answers/:id?", userAuth, function(req, res, next) {
   jwt.verify(req.token, "group1", (err, authData) => {
       if (authData) {
           if (req.params.id) {
               quiz_take.getAnswersByQuestionId(req.params.id, (err, rows) => {
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

router.post("/instance", userAuth, function(req, res, next) {
   jwt.verify(req.token, "group1", (err, authData) => {
       if (authData) {
           if(req.body){
               quiz_take.addQuizInstance(req.body, (err, rows) => {
                   if (err) {
                       res.json(err);
                   } else {
                       res.json(req.body);
                   }
               });
           }
       }
   });
});
router.get("/instance", userAuth, function(req, res, next) {
   jwt.verify(req.token, "group1", (err, authData) => {
       if (authData) {
         quiz_take.getCreatedQuizInstance(function(err, count) {
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

router.post("/answer_given", userAuth, function(req, res, next) {
    jwt.verify(req.token, "group1", (err, authData) => {
        if (authData) {
            if(req.body){
                quiz_take.addAnswerGiven(req.body, (err, rows) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(req.body);
                    }
                });
            }
        }
    });
 });







module.exports = router;
