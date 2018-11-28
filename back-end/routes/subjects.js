const express = require('express');
const router = express.Router();
const userAuth = require('../midware/userAuth');
const subject = require('../model/subject');
const jwt = require('jsonwebtoken');

router.get('/:id?', userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData) {
            if(req.params.id) {
                subject.getSubjectById(req.params.id, (err, rows) => {
                    if(err) {
                        res.json(err);
                    }
                    else {
                        res.json(rows);
                    }
                });
            }
            else {
                subject.getAllSubjects( (err, rows) => {
                    if(err) {
                        res.json(err);
                    }
                    else {
                        res.json(rows);
                    }
                });
            }
        }
        else {
            res.json('NO');
        }
    }); 
});


router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData){   
            subject.addSubject(req.body, function(err, count) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(req.body); //or return count for 1 & 0
                }
            }); 
        }
    });
});

module.exports = router;
