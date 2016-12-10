const dbConnection = require("../mongoConnection");
const users = require("../utilities/userMethods");
const items = require("../utilities/itemMethods");
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

const seedItems = [
    {
        "name": "Cheese",
        "description": "curdled milk from the finest of cows",
        "quantity": 10,
        "price": 1.20,
        "category": "food/pantry"
    },
    {
        "name": "Shark Tale DVD",
        "description": "When a son of a gangster shark boss is accidentally killed while on the hunt, his would-be prey and his vegetarian brother both decide to use the incident to their own advantage.",
        "quantity": 200,
        "price": 1999.99,
        "category": "entertainment"
    },
    {
        "name": "A Bear",
        "description": "A real live actual bear",
        "quantity": 3,
        "price": 10.00,
        "category": "furniture"
    },
    {
        "name": "Bees",
        "description": "bees",
        "quantity": 99999,
        "price": 0.01,
        "category": "bees"
    },
    {
        "name": "Dank Kush",
        "description": "top quality guaranteed to get you blazed",
        "quantity": 420,
        "price": 4.20,
        "category": "pharmaceuticals"
    },
]

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
        }).then((db) => {
            seedItems.forEach(function(item) {
                items.addItem(item)
                .then( function(newItem) {
                    console.log("Added item: ", newItem.name);
                })
                .catch( function(err) {
                    console.log(err);
                });
            })
        })
    });
}

