const express = require("express");
const router = express.Router();
const category = require("../model/category");
const material = require('../model/material');
const jwt = require('jsonwebtoken');
const userAuth = require('../midware/userAuth');


router.get("/:id?", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(err) console.log(err);
        if(authData){
            console.log(req.params);
            if (req.params.id) {
               material.getMaterialByCategoryId(req.params.id, (err, rows) => {
                if(err) res.json(err);
                if(rows){
                    console.log(rows);
                    res.json(rows);
                } 
               });
            } else {
                material.getAllMaterials( (err, rows) => {
                    if(err) res.json(err);
                    if(rows) res.json(rows);
                });
            }
        }
    });
});


// router.post("/", userAuth, function(req, res, next) {
//     jwt.verify(req.token, 'group1', (err, authData) => {
//         if(authData){   
//     category.addCategory(req.body, function(err, count) {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(req.body); //or return count for 1 & 0
//         }
//     }); 
//     } else{
//         res.json(err);
//     }
//     });
// });

module.exports = router;
