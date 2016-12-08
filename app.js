const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const userMethods = require('./utilities/userMethods');
const bcrypt = require('bcrypt');
const saltRounds = 4;

const app = express();

/* Routes */
var index = require('./routes/index');
var login = require('./routes/login');
var priv = require('./routes/priv');
var users = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('finalProject'));
app.use(session({ secret: 'finalProject', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    userMethods.getUserByUsername(username)
        .then( (user) => {
            done(null, user);
        })
        .catch( (err) => {
            done(err, user);
        });
});

// Use local strategy.
passport.use(new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        // get user by username and then check the password.
        userMethods.getUserByUsername(username)
            .then( (user) => {
                console.log(user);
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        console.log("password correct");
                        return done(null, user);
                    } else {
                        console.log("password incorrect");
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            })
            .catch( (err) => {
                console.log(err);
                return done(null, false);
            });
    }
));

app.use('/public', express.static(__dirname + "/public"));
app.use('/', index);
app.use('/login', login);
app.use('/private', priv);
app.use('/users', users);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
