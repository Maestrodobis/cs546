const users = require('../mongoCollections').users;
const uuid = require('node-uuid');

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

addUser = (user) => {
    return new Promise( (resolve, reject) => {
        console.log(user);

        users()
            .then( (userCollection) => {
                userCollection
                    .insertOne(user)
                    .then( (newUserInfo) => {
                        return newUserInfo.insertedId;
                    })
                    .then( (id) => {
                        return userCollection.findOne({ _id: id});
                    })
                    .then( (newUser) => {
                        resolve(newUser);
                    })
                    .catch( (err) => {
                        console.log(err);
                        reject(err);
                    });
            })
            .catch( (err) => {
                console.log(err);
                reject(err);
            });
    });
};

updateUser = (username, propsToUpdate) => {
    return new Promise( (resolve, reject) => {
        users()
            .then( (userCollection) => {
                userCollection
                    .updateOne(
                        {
                            username: username
                        },
                        {
                            $set: propsToUpdate
                        })
                    .then( (r) => {
                        if (r.result.n === 0) {
                            reject("No user exists with username " + username);
                        } else {
                            return userCollection.findOne({username: username});
                        }
                    })
                    .then( (updatedUser) => {
                        resolve(updatedUser);
                    })
                    .catch( (err) => {
                        console.log(err);
                        reject(err);
                    });
            })
            .catch( (err) => {
                console.log(err);
                reject(err);
            });
    });
};

module.exports = {
    getUserByUsername: getUserByUsername,
    getAllUsers: getAllUsers,
    addUser: addUser,
    updateUser: updateUser
};
