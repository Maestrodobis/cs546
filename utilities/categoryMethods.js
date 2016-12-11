//admin operations ONLY
const categories = require('../mongoCollections').categories;
const uuid = require('node-uuid');


let exportedMethods = {

	getCategoryById(id) {
		if(!id) return Promise.reject("No category id has been specified!");
		return categories().then((categoryCollection) => {
			return categoryCollection.findOne( { _id: id} ).then((category) => {
				if (category === null) {
					return Promise.reject("The category with id of " + id + " could not be found!");
				} else return category;
			});;
		});
	},

	getCategoryByName(categoryName) {
		if(!categoryName) return Promise.reject("No category name has been specified!");
		return categories().then((categoryCollection) => {
			return categoryCollection.findOne( { name: categoryName} ).then((category) => {
				if (category === null) {
					return Promise.reject("The category called " + categoryName + " could not be found!");
				} else return category;
			});;
		});
	},

	getAllCategories() {
		return categories().then((categoryCollection) => {
			return categoryCollection.find().toArray();
		});

	},

	addCategory(category) {
		if (!category.name) return Promise.reject("No category name provided");
		//check for existing category with this name
		return getCategoryByName(category.name).then(() => {
			return categories().then((categoryCollection) => {
				return categoryCollection.insertOne(category).then((newCategoryInfo) => {
					return newItemInfo.insertedId;
				}).then((id) => {
					return itemCollection.findOne({ _id: id});
				});
			});
		}).catch((err) => {
			return Promise.reject("A category called " + category.name + "already exists!");
		});

	},

	deleteCategoryById(id) {
		if (!id) return Promise.reject("No id provided!");
        return this.getCategoryById(id).then(function(category){
            return categories().then((categoryCollection) => {
                return categoryCollection.removeOne({ _id: id}).then((deletionInfo) => {
                    if(deletionInfo.deletedCount === 0) throw ("Could not delete category with id of " + id + ".");
                });
            });
        }).catch(function(error){
            return Promise.reject(error);
        });

	},

	updateCategoryById(id, updateData) {

	}

};

module.exports = exportedMethods;