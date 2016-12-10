
(function ($, item) {

    var itemForm = $("#updateItemForm");
    var itemNameInput = $("#itemName");
    var categoryInput = $("#category");
    var priceInput = $("#price");
    var quantityInput = $("#quantity");
    var descriptionInput = $("#descriptionInput");

    itemForm.submit(function(event) {
        event.preventDefault();

        var itemName = itemNameInput.val();
        var category = categoryInput.val();
        var price = priceInput.val();
        var quantity = quantityInput.val();
        var description = descriptionInput.val();
        
        console.log("something submitted");

    });


});