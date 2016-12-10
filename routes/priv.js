const express = require('express');
var router = express.Router();
const authenticate = require('../utilities/authenticate');

router.get('/inventory', authenticate, (req, res) => {
    if (req.user.roles.indexOf("admin") == -1) {
        res.render("pages/inventory", {admin: 0, partial:"inventory-scripts" });
    } else{
        res.render("pages/inventory", {admin: 1, partial:"inventory-scripts"});
    }
    
});

router.get('/inventory/:item', authenticate, (req, res) => {
    if (req.user.roles.indexOf("admin") == -1) {
        res.render("pages/item", {admin: 0, partial:"inventory-scripts"});
    } else{
        res.render("pages/item", {admin: 1, partial:"inventory-scripts"});
    }
    
});

module.exports = router;
