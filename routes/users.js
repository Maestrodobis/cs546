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

/**
 * @router("/users/add")
 * @method("POST")
 *
 * Adds a user to the collection.
 */
router.post('/add', authenticate, (req, res) => {
    // Ensure that the user is an admin.
    if (req.user.roles.indexOf("admin") == -1) {
        res.send("Not authorized to add user");
        return;
    }

    var user = {
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles
    };

    console.log(user);

    userMethods.addUser(user)
        .then( (newUser) => {
            console.log("Added user ", user.username);
            res.send(newUser);
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
        });
});

module.exports = router;
