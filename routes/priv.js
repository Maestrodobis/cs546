const express = require('express');
var router = express.Router();
const authenticate = require('../utilities/authenticate');

router.get('/', authenticate, (req, res) => {
    res.send('private page');
});

module.exports = router;
