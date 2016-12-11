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
    	// res.status(200).json(items);
        console.log(items);
        if (req.user.roles.indexOf("admin") == -1) {
            console.log(items);
            res.render("pages/inventory", {items: items, admin: 0, partial:"inventory-scripts" });
        } else{
            console.log(items);
            res.render("pages/inventory", {items: items, admin: 1, partial:"inventory-scripts"});
        }
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
    	if (req.user.roles.indexOf("admin") == -1) {
            res.render("pages/item", {item: item, admin: 0, partial:"item-scripts"});
        } else{
            res.render("pages/item", {item: item, admin: 1, partial:"item-scripts"});
        }
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
        name: req.body.itemName,
        description: req.body.description,
        quantity: req.body.itemQuantity,
        price: req.body.price,
        category: req.body.category,
        lastUpdatedBy: req.user.username,
        lastUpdateTime: timestamp
    };

    console.log(item);
    
    itemMethods.addItem(item).then((newItem) => {
    	res.send(newItem);
    }).catch((err) => {
    	res.status(500).json({ error: err});
    });
 });

router.put('/update/:id', authenticate, (req, res) => {
    
    let removeUndefined = (properties) => {
        Object.keys(properties).forEach( (key) => {
            if (properties[key] === undefined) {
                delete properties[key];
            }
        });
    }

    let date = new Date();

    let timestamp = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + " @ " 
    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    var propsToUpdate = {
        name: req.body.itemName,
        description: req.body.description,
        quantity: req.body.itemQuantity,
        price: req.body.price,
        category: req.body.category,
        lastUpdatedBy: req.user.username,
        lastUpdateTime: timestamp

    };

    if (req.user.roles.indexOf("admin") == -1) {
        //user can only update quantity
        if (propsToUpdate.name) delete propsToUpdate.name;
        if (propsToUpdate.description) delete propsToUpdate.description;
        if (propsToUpdate.price) delete propsToUpdate.price;
        if (propsToUpdate.category) delete propsToUpdate.category;

        deleteUndefined(propsToUpdate);

        itemMethods.updateItemById(req.params.id, propsToUpdate)
        .then( (updatedItem) => {
            res.send(updatedItem);
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
        });
        return;
    }

    // Delete any properties that are undefined (don't want to update those)
    deleteUndefined(propsToUpdate);

    itemMethods.updateItemById(req.params.id, propsToUpdate)
        .then( (updatedItem) => {
            res.send(updatedItem);
        })
        .catch( (err) => {
            console.log(err);
            res.send(err);
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