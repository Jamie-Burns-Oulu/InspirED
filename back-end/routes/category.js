const express = require("express");
const router = express.Router();
const category = require("../model/category");

router.get("/:id?", function(req, res, next) {
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
});


router.post("/", function(req, res, next) {
    category.addCategory(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

module.exports = router;
