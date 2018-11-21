const express = require('express');
const router = express.Router();
// const userAuth = require('../midware/userAuth');
const subject = require('../model/subject');

router.get('/:id?', function(req, res, next) {
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

module.exports = router;
