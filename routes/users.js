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
            res.render("pages/users", {"users":users});
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
            res.render("pages/user", {"user":user});
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
        });
});

/**
 * @route("/users/add")
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

/**
 * @route("/users/update/:username")
 * @method("PUT")
 *
 * Updates the user given by the username with the details provided.
 */
router.put('/update/:username', authenticate, (req, res) => {
    // Ensure that the user is an admin.
    if (req.user.roles.indexOf("admin") == -1) {
        res.send("Not authorized to add user");
        return;
    }

    var propsToUpdate = {
        roles: req.body.roles,
        password: req.body.password
    };

    // Delete any properties that are undefined (don't want to update those)
    Object.keys(propsToUpdate).forEach( (key) => {
        if (propsToUpdate[key] === undefined) {
            delete propsToUpdate[key];
        }
    });

    userMethods.updateUser(req.params.username, propsToUpdate)
        .then( (updatedUser) => {
            res.send(updatedUser);
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
        });
});


module.exports = router;
