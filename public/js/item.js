
(function () {

    var deleteItem = $("#deleteItem");
    var confirmDeleteWrapper = $("#confirmDeleteWrapper");
    var confirmUpdateWrapper = $("#confirmUpdateWrapper");
    var cancelUpdate = $("#cancelUpdateButton");
    var confirmUpdate = $("#confirmUpdateButton");
    var cancelDelete = $("#cancelDelete");
    var confirmDelete = $("#confirmDelete");
    var itemId = $("#itemId").val();

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
            url: "/items/delete/"+itemId,
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
        try{

        
            nameInput.removeClass("hidden");
            quantityInput.removeClass("hidden");
            categoryInput.removeClass("hidden");
            priceInput.removeClass("hidden");
            descriptionInput.removeClass("hidden");
            nameUpdateButton.removeClass("hidden");

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

            errorContainer.addClass("hidden");

            // var requestConfig = {
            //     method: "Post",
            //     url: "/items/add/",
            //     data: JSON.stringify({
            //         "itemName":itemNameVal,
            //         "description": descriptionVal,
            //         "itemQuantity": quantityVal,
            //         "price": priceVal,
            //         "category": categoryVal
            //     }),
            //     contentType: 'application/json'
            // };

            $.ajax(requestConfig).then(function (responseMessage){
                //If we got a response populate the page
                if( responseMessage ){
                    if( responseMessage.error ){
                        errorContainer.removeClass("hidden");
                        errorText.text(responseMessage.error);
                    }
                    $("#itemTable tr:last").after('<tr class="itemRow"><td>'+responseMessage.name+'</td><td>'
                    +responseMessage.category+'</td><td>'
                    +responseMessage.price+'</td><td>'
                    +responseMessage.quantity+'</td></tr>');
                    
                }
            });

        }
    });

    


})();