const express = require('express');
var router = express.Router();
const categoryMethods = require('../utilities/categoryMethods');

/**
 * @route("/categories")
 * @method("GET")
 *
 * Returns a list of all item categories
*/

router.get('/', (req, res) => {
    categoryMethods.getAllCategories().then((categories) => {
		console.log(categories);
		res.render("pages/categories",{"categories":categories});
    }).catch((err) => {
    	res.status(500).json({error: err});
    });
});

router.get('/:id', (req, res) => {
	categoryMethods.getCategoryById(req.params.id).then((category) => {
		res.status(200).json(category);
	}).then((err) => {
		res.status(404).json({error: err});
	});
});

router.get('/:categoryName', (req, res) => {
	categoryMethods.getCategoryByName(req.params.categoryName).then((category) => {
		res.status(200).json(category);
	}).then((err) => {
		res.status(404).json({error: err});
	});
});

router.post('/add', (req, res) => {
	// Ensure that the user is an admin.
    if (req.user.roles.indexOf("admin") == -1) {
        res.send("Not authorized to add a category");
        return;
    }

    let category = {name: req.body.categoryName };


});

module.exports = router;