const express = require('express');
var router = express.Router();

/**
 * @route("/users")
 * @method("GET")
 *
 * Returns a list of all users with their usernames and roles.
 */
router.get('/', authenticate, (req, res) => {
    // Ensure that the user is an admin.
    console.log(req.user);

    res.send([]);
});

module.exports = router;
