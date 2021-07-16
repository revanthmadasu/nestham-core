var express = require('express');
const { createUser } = require('./signUp');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signUp', createUser)
module.exports = router;
