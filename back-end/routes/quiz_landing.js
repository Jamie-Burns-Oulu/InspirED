const express = require('express');
const router = express.Router();
const userAuth = require('../midware/userAuth');
const quiz_landing = require('../model/quiz_landing');
const jwt = require('jsonwebtoken');

router.get("/attempted", userAuth, function(req, res, next) {
   jwt.verify(req.token, 'group1', (err, authData) => {
       if(authData){
       if (req.body) {
         quiz_landing.getAttemptedQuizInstances(authData.user.id, (err, rows) => {
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

router.get("/complete", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData){
        if (req.body) {
          quiz_landing.getCompletedQuizInstances(authData.user.id, (err, rows) => {
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

 router.get("/new", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData){
        if (req.body) {
          quiz_landing.getNewQuizzes(authData.user.id, (err, rows) => {
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