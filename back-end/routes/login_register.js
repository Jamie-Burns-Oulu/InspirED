var express = require("express");
var router = express.Router();
var login_register = require("../model/login_register");


// router.post("/", function(req, res, next) {
//     login_register.addUser(req.body, function(err, count) {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(req.body); //or return count for 1 & 0
//         }
//     });
// });

router.post("/", function(req, res, next) {
   login_register.getUserByUsername(req.body.username, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            if(req.body.password === rows[0].password) {
                req.user = {
                    username: rows[0].username,
                    id: rows[0].id
                };
                console.log(req.user);
                res.json(rows);
            }
            else {
                console.log('wrong password');
            }
        }
    });
});

module.exports = router;
