
(function () {

    var itemForm = $("#updateItemForm");
    var itemNameInput = $("#itemName");
    var categoryInput = $("#category");
    var priceInput = $("#price");
    var quantityInput = $("#quantity");
    var descriptionInput = $("#descriptionInput");

    var deleteItem = $("#deleteItem");
    var confirmDeleteWrapper = $("#confirmDeleteWrapper");
    var cancel = $("#cancelButton");
    var confirm = $("#confirmButton");
    var itemId = $("#itemId").val();
    
    deleteItem.click(function(){
        confirmDeleteWrapper.removeClass("hidden");
    });

    cancel.click(function(){
        confirmDeleteWrapper.addClass("hidden");
    });
    confirm.click(function(){
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

    itemForm.submit(function(event) {
        event.preventDefault();

        var itemName = itemNameInput.val();
        var category = categoryInput.val();
        var price = priceInput.val();
        var quantity = quantityInput.val();
        var description = descriptionInput.val();
        

    });

    


})();