const express = require("express");
const router = express.Router();
const material = require('../model/material');
const jwt = require('jsonwebtoken');
const userAuth = require('../midware/userAuth');
const uniqueResult = require('../midware/uniqueResult');

router.get('/:name', userAuth, function(req, res, next)  {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(userAuth) {
            console.log(req.params);
            material.getAllMaterialItemsByMaterialId(req.params.name, (err, rows) => {
                if(err) console.log(err);
                if(rows) {
                    
                    const r = uniqueResult(rows, 'id');
                    const uniq = uniqueResult(rows, 'quizname');
                    res.json({rows: r, quiz: uniq})};
            });
        }
    });
});
router.post('/', userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(userAuth) {
            material.addMaterialItem(req.body, (err, rows) => {
                if(err) res.json(err);
                if(rows) {
                    res.json(rows);
                }
            });
        }
    });
});
router.put('/', userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(userAuth) {
            console.log(req.body);
            material.updateItem(req.body.current, (err, rows) => {
                if(err) console.log(err);
                if(rows) res.json(rows);
            });
        }
    });
});
module.exports = router;