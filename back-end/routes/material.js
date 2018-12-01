const express = require("express");
const router = express.Router();
const category = require("../model/category");
const material = require('../model/material');
const jwt = require('jsonwebtoken');
const userAuth = require('../midware/userAuth');
const sortData = require('../midware/sortData');


router.get("/:name?", userAuth, function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, authData) => {
        if(err) console.log(err);
        if(authData){
            if (req.params.name) { 
                let name = req.params.name;
                if(req.params.name.includes(';;')) {
                    name = req.params.name.replace(/;;/g, '#');
                }
               material.getMaterialByCategoryName(name, (err, rows) => {
                if(err) res.json(err);
                if(rows){
                    res.json(rows);
                } 
               });
            } 
            else {
                material.getAllMaterials( (err, rows) => {
                    if(err) res.json(err);
                    if(rows) {
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
            material.addMaterial(req.body, authData.user.id, function(err, count) {
                if (err) {
                    res.json(err);
                } else {
                    console.log(count);
                    res.json(count); 
                }
            }); 
        } 
        else {
            res.json(err);
        }
    });
});

module.exports = router;
// let data = {};
// for(let i = 0; i < rows.length; i++) {
    
//     if (data[rows[i].subject_name] === undefined) {
//         data[rows[i].subject_name] = [];
//         data[rows[i].subject_name].push(rows[i]);
//     }
//     else {
//         data[rows[i].subject_name].push(rows[i]);
//     }
// }
// const responseData = {};
// Object.keys(data).map( key => {
//     const cats = {}
//     cats.category_name = data[key].map(item => item.category_name)
//     .filter((value, index, self) => self.indexOf(value) === index);
//     responseData[key] = cats;
//     cats.subject_name = key;
// });
// console.log(rows);
// res.json(responseData);