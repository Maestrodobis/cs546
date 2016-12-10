const express = require('express');
var router = express.Router();
const itemMethods = require('../utilities/itemMethods');

/**
 * @route("/items")
 * @method("GET")
 *
 * Returns a list of all items.
 */

//if and when we implement departments for users we may need to do some check here so users can only see/edit items in their department

router.get('/', (req, res) => {

    itemMethods.getAllItems().then((items) => {
    	res.status(200).json(items);
    }).catch( (err) => {
    	res.status(404).json({error: err});
    });
});


/**
 * @route("/items/:itemName")
 * @method("GET")
 *
 * Finds a single item by name and returns a single item.
 */
router.get('/:itemName', (req, res) => {
    
    itemMethods.getItemByName(req.params.itemName).then((item) => {
    	res.status(200).json(item);
    }).catch((err) => {
    	res.status(404).json({error: err});
    });
});

/**
 * @route("/items/:id")
 * @method("GET")
 *
 * Finds a single item by id and returns a single item.
 */
router.get('/:id', (req, res) => {
    
    itemMethods.getItemById(req.params.id).then((item) => {
    	res.status(200).json(item);
    }).catch((err) => {
    	res.status(404).json({error: err});
    });
});

/**
 * @route("/items/add")
 * @method("POST")
 *
 * Adds an item to the collection.
 */
router.post('/add', authenticate, (req, res) => {
    // Ensure that the user is an admin.
    if (req.user.roles.indexOf("admin") == -1) {
        res.send("Not authorized to add user");
        return;
    }

    let date = new Date();

	let timestamp = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + " @ " 
	+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let item = {
        itemName: req.body.itemName,
        description: req.body.description,
        quantity: req.body.itemQuantity,
        price: req.body.price,
        category: req.body.category,
        lastUpdatedBy: req.user.username,
        lastUpdateTime: timestamp
    };

    itemMethods.addItem(item).then((newItem) => {
    	res.status(200).json(newItem);
    }).catch((err) => {
    	res.status(500).json({ error: err});
    });
 });

router.delete('/:id', authenticate, (req, res) => {

	if (req.user.roles.indexOf("admin") == -1) {
    	res.send("Not authorized to delete an item!");
    	return;
    }

    let getItem = itemMethods.getItemById(req.params.id);

    getItem.then(() => {
    	return itemMethods.deleteItemById(req.params.id).then(() => {
    		res.status(200);
    	}).catch((err) => {
    		res.status(500).json({error: err});
    	});
    }).catch((err) => {
    	res.status(404).json({error: err});
    });

});

module.exports = router;