const express = require('express');
var router = express.Router();
const userMethods = require('../utilities/userMethods');

/**
 * @route("/users")
 * @method("GET")
 *
 * Returns a list of all users with their usernames and roles.
 */
router.get('/', authenticate, (req, res) => {
    // Ensure that the user is an admin.
    console.log(req.user);

    if (req.user.roles.indexOf("admin") == -1) {
        res.send("Not authorized to view this page");
        return;
    }

    userMethods.getAllUsers()
        .then( (users) => {
            users.forEach( (user) => {
                delete user.password;
            });

            res.send(users);
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
        });
});

/**
 * @router("/users/:username")
 * @method("GET")
 *
 * Returns info on the user with the given username.
 */
router.get('/:username', authenticate, (req, res) => {
    // Ensure that the user is an admin.
    if (req.user.roles.indexOf("admin") == -1) {
        res.send("Not authorized to view this page");
        return;
    }

    userMethods.getUserByUsername(req.params.username)
        .then( (user) => {
            delete user.password;

            res.send(user);
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
        });
});

module.exports = router;
