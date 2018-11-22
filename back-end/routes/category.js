const express = require("express");
const router = express.Router();
const category = require("../model/category");
const jwt = require('jsonwebtoken');
const userAuth = require('../midware/userAuth');


router.get("/:id?", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData){
        if (req.params.id) {
            category.getCategoryById(req.params.id, (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        } else {
            category.getAllCategories((err, rows) => {
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


router.post("/", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(authData){   
    category.addCategory(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    }); 
    } else{
        res.json(err);
    }
    });
});

module.exports = router;
