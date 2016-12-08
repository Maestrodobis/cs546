// Method to check if user is authenticated.
authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

module.exports = authenticate;
