const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('index');
});

module.exports = router;
