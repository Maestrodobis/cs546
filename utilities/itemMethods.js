const items = require('../mongoCollections').items;
const uuid = require('node-uuid');

let exportedMethods = {

	getItembyId(id) {
		if(!id) return Promise.reject("No item id has been specified!");
		return items().then((itemCollection) => {
			return itemCollection.findOne( { _id: id} ).then((item) => {
				if (item === null) {
					return Promise.reject("The item with id of " + id + " could not be found!");
				} else return item;
			});;
		});
	},

	getItemByName(itemName) {
		if(!itemName) return Promise.reject("No item name provided!");
		return items().then((itemCollection) => {
			return itemCollection.findOne( { name: itemName} ).then((item) => {
				if (item === null) {
					return Promise.reject(itemName + " could not be found!");
				} else return item;
			});;
		});
	},

	getAllItems() {
		return items().then((itemCollection) => {
			return itemCollection.find().toArray();
		});
	},

	addItem(item) {
		//
		if (!item.name) return Promise.reject("No item name provided!");
		if (!item.description) return Promise.reject("No item description provided!");
		if (!item.quantity) return Promise.reject("No item quantity provided!");
		if (!item.price) return Promise.reject("No item price provided!");
		if (!item.category) return Promise.reject("No item category provided!");
		//checking for an existing item with the same name:

		return items().then((itemCollection) => {
			return itemCollection.insertOne(item).then((newItemInfo) => {
				return newItemInfo.insertedId;
			}).then((id) => {
				return itemCollection.findOne({ _id: id});
			});
		});
	},

	updateItem(id, updateData) {
		if (!id) return Promise.reject("No item id provided!");
		if (!updateData) return Promise.reject("No update data provided!");
		return items().then((itemCollection) => {
			return itemCollection.updateOne({ _id: id }, {updateData}).then((deletionInfo) => {
				if (deletionInfo.deletedCount === 0) {
					throw ("Could not update item with id of " + id.toString() + "!");
				}
				return this.getItembyId;
			});
		});
	},

	deleteItemById(id) {
		if (!id) return Promise.reject("No id provided!");
        return this.getItemById(id).then(function(item){
            return items().then((itemCollection) => {
                return itemCollection.removeOne({ _id: id}).then((deletionInfo) => {
                    if(deletionInfo.deletedCount === 0) throw ("Could not delete item with id of " + id + ".");
                });
            });
        }).catch(function(error){
            return Promise.reject(error);
        });
	}
}

module.exports = exportedMethods;