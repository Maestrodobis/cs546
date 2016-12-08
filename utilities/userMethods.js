const users = require('../mongoCollections').users;

getUserByUsername = (username) => {
    return new Promise( (resolve, reject) => {
        users()
            .then( (userCollection) => {
                return userCollection.findOne({ username: username });
            })
            .then( (user) => {
                if (!user) {
                    console.log("No user found with username:", username);
                    reject("No user found for username: " + username);
                } else {
                    resolve(user);
                }
            })
            .catch( (err) => {
                console.log(err);
                reject(err);
            });
    });
};

hasRole = (username, role) => {
    getUserByUsername(username)
        .then( (user) => {
            if (user) {
                return user.roles.indexOf(role) > 0;
            }
        })
        .catch( (err) => {
            console.log(err);
            return false;
        });
};

module.exports = {
    getUserByUsername: getUserByUsername,
    hasRole: hasRole
};
