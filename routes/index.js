const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render("pages/login",{});
});

module.exports = router;
