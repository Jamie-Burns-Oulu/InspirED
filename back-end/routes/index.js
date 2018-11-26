var express = require('express');
var router = express.Router();
const authUser = require('../midware/userAuth');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', authUser,function(req, res, next) {
    jwt.verify(req.token, 'group1', (err, data) => {
      if(err) res.json(err);
      if(data) res.json(data);
    })
  // res.json('hello');
  // res.render('index', { title: 'Express' });
});

module.exports = router;