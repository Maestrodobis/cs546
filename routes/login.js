const express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', passport.authenticate('local', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/private');
});

module.exports = router;
