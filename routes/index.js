const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.user){
	res.redirect("/");
    } else{
	var loginError = false;
	if(req.query.loginError == "badLogin" )
	{
	    loginError = "You have submitted an incorrect username or password.  Please try again.";
	}
	res.render("pages/login",{"error":loginError});
    }
});

module.exports = router;
