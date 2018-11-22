const express = require('express');
const router = express.Router();
const userAuth = require('../midware/userAuth');
const user = require('../model/user');
const subject = require('../model/subject');
const jwt = require('jsonwebtoken');

router.get('/:id?', userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
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
    });

    
});

module.exports = router;
