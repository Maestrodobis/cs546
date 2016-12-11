
(function () {

    var deleteItem = $("#deleteItem");
    var confirmDeleteWrapper = $("#confirmDeleteWrapper");
    var confirmUpdateWrapper = $("#confirmUpdateWrapper");
    var cancelUpdate = $("#cancelUpdateButton");
    var confirmUpdate = $("#confirmUpdateButton");
    var cancelDelete = $("#cancelDeleteButton");
    var confirmDelete = $("#confirmDeleteButton");
    var itemId = $("#itemId").text();
    var itemEdit = $("#itemEdit");
    var itemUpdate = $("#itemUpdateButton");
    var errorContainer = $("#errorContainer");
    var errorText = $("#errorText");


    // var nameEditButton = $("#nameEditButton");
    var nameInput = $("#nameInput");
    var nameField = $("#nameField");
    // var nameUpdateButton = $("#nameUpdateButton");

    // var categoryEditButton= $("#categoryEditButton");
    var categoryInput = $("#categoryInput");
    var categoryField = $("#categoryField");
    // var categoryUpdateButton = $("#categoryUpdateButton");

    // var priceEditButton= $("#priceEditButton");
    var priceInput = $("#priceInput");
    // var priceField = $("#priceField");
    // var priceUpdateButton = $("#priceUpdateButton");

    // var quantityEditButton=$("#quantityEditButton");
    var quantityInput = $("#quantityInput");
    var quantityField = $("#quantityField");
    // var quantityUpdateButton = $("#quantityUpdateButton");

    // var descriptionEditButton = $("#descriptionEditButton");
    var descriptionInput = $("#descriptionInput");
    var descriptionField = $("#descriptionField");
    // var descriptionUpdateButton = $("#descriptionUpdateButton");

    
    deleteItem.click(function(){
        confirmDeleteWrapper.removeClass("hidden");
    });

    cancelDelete.click(function(){
        confirmDeleteWrapper.addClass("hidden");
    });
    
    confirmDelete.click(function(){
        //Make request to delete user
        var requestConfig = {
            method: "Delete",
            url: "/items/"+itemId,
            contentType: 'application/json'
        };
        $.ajax(requestConfig).then(function (responseMessage){
            //If we got a response populate the page
            if( responseMessage ){
                window.location.href = "/items";
            }
        });
    });

    itemEdit.click(function(){
        nameInput.removeClass("hidden");
        quantityInput.removeClass("hidden");
        categoryInput.removeClass("hidden");
        priceInput.removeClass("hidden");
        descriptionInput.removeClass("hidden");
        itemUpdate.removeClass("hidden");
    });

    itemUpdate.click(function(){
        confirmUpdateWrapper.removeClass("hidden");
    });

    cancelUpdate.click(function(){
        confirmUpdateWrapper.addClass("hidden");
    })

    confirmUpdate.click(function(){
        try{      
            console.log("hrey");
            var itemName = $("#nameInput");
            var category = $("#categoryInput");
            var description = $("#descriptionInput");
            var quantity = $("#quantityInput");
            var price = $("#priceInput");



            var itemNameVal = itemName.val();
            var categoryVal = category.val();
            var descriptionVal = description.val();
            var quantityVal = quantity.val();
            var priceVal = price.val();
            
            var propsToUpdate = {};

            if(itemNameVal != ""){
                propsToUpdate.itemName = itemNameVal;
            }

            if(categoryVal != ""){
                propsToUpdate.category = categoryVal;
            }

            if(descriptionVal != ""){
                propsToUpdate.description = descriptionVal;
            }

            if(quantityVal){
                propsToUpdate.itemQuantity = quantityVal;
            }

            if(price){
                propsToUpdate.price = priceVal;
            }

            errorContainer.addClass("hidden");

            var requestConfig = {
                method: "Put",
                url: "/items/update/"+itemId,
                data: JSON.stringify(propsToUpdate),
                contentType: 'application/json'
            };

            $.ajax(requestConfig).then(function (responseMessage){
                //If we got a response populate the page
                if( responseMessage ){
                    if( responseMessage.error ){
                        errorContainer.removeClass("hidden");
                        errorText.text(responseMessage.error);
                    }
                    nameField.text(responseMessage.name);
                    categoryField.text(responseMessage.category);
                    descriptionField.text(responseMessage.description);
                    quantityField.text(responseMessage.quantity);
                    priceField.text(responseMessage.price);
                    
                }
            });

        }catch(e){
            errorContainer.removeClass("hidden");
            errorText.text(e.message);
        }

        return false;
    });

    

})();