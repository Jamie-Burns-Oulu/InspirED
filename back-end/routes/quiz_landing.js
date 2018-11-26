const express = require('express');
const router = express.Router();
const userAuth = require('../midware/userAuth');
const quiz_landing = require('../model/quiz_landing');
const jwt = require('jsonwebtoken');

router.post("/Attempted", userAuth, function(req, res, next) {
   jwt.verify(req.token, 'group1', (err, authData) => {
       if(authData){
       if (req.body) {
         quiz_landing.getAttemptedQuizInstances(req.body.user_id, (err, rows) => {
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
router.post("/Completed", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData){
        if (req.body) {
          quiz_landing.getCompletedQuizInstances(req.body.user_id, (err, rows) => {
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

module.exports = router;