var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var passport = require('passport')

function getUser(){
  return knex('user_table')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req,res,next){
  getUser()
  .insert({username: req.body.newUsername, password: bcrypt.hashSync(req.body.newPassword, 10)
  })
  .then(function(data){
    res.redirect('/')
  })
})


router.post('/login', function (req, res, next){
passport.authenticate('local', function(err,user,info) {
return res.redirect('/users');
  })(req,res,next)
})

module.exports = router;
