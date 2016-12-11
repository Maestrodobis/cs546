const express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', passport.authenticate('local', {
    failureRedirect: '/?loginError=badLogin'
}), (req, res) => {
    res.redirect('/items');
});

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
