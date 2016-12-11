const users = require('../mongoCollections').users;
const uuid = require('node-uuid');


let exportedMethods = {

    getUserByUsername(username) {
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
    },

    getAllUsers() {
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
    },

    addUser(user) {
        if (!user.username) return Promise.reject("No username provided!");
        if (!user.password) return Promise.reject("No password provided!");
        if (!user.firstName) return Promise.reject("No firstName provided!");
        if (!user.lastName) return Promise.reject("No lastName provided!");
        if (!user.roles) return Promise.reject("No role provided");

        //check for uniqueness of username needed
        return new Promise( (resolve, reject) => {
            
            // console.log(user);
            
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
    },

    updateUser(username, propsToUpdate) {
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
    },

    deleteUser(username) {
        if (!username) return Promise.reject("No username provided!");
        return this.getUserByUsername(username).then(function(user){
            return users().then((userCollection) => {
                return userCollection.removeOne({ _id: user._id}).then((deletionInfo) => {
                    if(deletionInfo.deletedCount === 0) throw ("Could not delete user with username of " + username + ".");
                });
            });
        }).catch(function(error){
            return Promise.reject(error);
        }); 
    },
};

module.exports = exportedMethods;