const express = require("express");
const router = express.Router();
const material = require('../model/material');
const jwt = require('jsonwebtoken');
const userAuth = require('../midware/userAuth');

router.get('/:name', userAuth, function(req, res, next)  {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(userAuth) {
            material.getAllMaterialItemsByMaterialId(req.params.name, (err, rows) => {
                if(err) console.log(err);
                if(rows) res.json(rows);
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
module.exports = router;