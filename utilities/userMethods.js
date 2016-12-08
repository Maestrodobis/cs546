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

getAllUsers = () => {
    return new Promise( (resolve, reject) => {
        users()
            .then( (userCollection) => {
                return userCollection.find().toArray();
            })
            .then( (users) => {
                console.log(users);
                resolve(users);
            })
            .catch( (err) => {
                console.log(err);
                reject(err);
            });
    });
};

module.exports = {
    getUserByUsername: getUserByUsername,
    getAllUsers: getAllUsers
};
