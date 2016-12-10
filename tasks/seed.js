const dbConnection = require("../mongoConnection");
const users = require("../utilities/userMethods");
const bcrypt = require('bcrypt');

// const salt = 4;
// console.log( bcrypt.hashSync("password", salt) );
//Define all users here
const seedUsers = [
    {
        "username":"admin",
        "firstName":"admin",
        "lastName":"admin",
        "password":"$2a$04$Fvp1Udr/5BX0sWVakNuFy.P82Ngd7gqiwfye7PaHp4mkifT66oBSO", //password
        "roles":"admin"
    },
    {
        "username":"frodo",
        "firstName":"Frodo",
        "lastName":"Baggins",
        "password":"$2a$04$Fvp1Udr/5BX0sWVakNuFy.P82Ngd7gqiwfye7PaHp4mkifT66oBSO", //password
        "roles":"employee"
    },
    {
        "username":"sam",
        "firstName":"Samwise",
        "lastName":"Gamgee",
        "password":"$2a$04$Fvp1Udr/5BX0sWVakNuFy.P82Ngd7gqiwfye7PaHp4mkifT66oBSO", //password
        "roles":"employee"
    },
    {
        "username":"superWizard2000",
        "firstName":"Gandolf",
        "lastName":"Grey",
        "password":"$2a$04$Fvp1Udr/5BX0sWVakNuFy.P82Ngd7gqiwfye7PaHp4mkifT66oBSO", //password
        "roles":"employee"
    },
    {
        "username":"gollum",
        "firstName":"Smeagol",
        "lastName":"none",
        "password":"$2a$04$Fvp1Udr/5BX0sWVakNuFy.P82Ngd7gqiwfye7PaHp4mkifT66oBSO", //password
        "roles":"employee"
    }
];

module.exports = function(){
    dbConnection().then(db => {
         db.dropDatabase().then(() => {

        }).then((db) => {
            //Add all users to database
            seedUsers.forEach(function(user){
                users.addUser(user)
                .then( function(newUser){
                        console.log("Added user:", newUser.username);
                })
                .catch( function(err){
                    console.log(err);
                });
            })
        })
    });
}

