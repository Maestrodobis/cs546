(function(){

    //Get all rows on the page
    var itemRows = $(".itemRow");
    var deleteButtons = $(".deleteButtons");
    var submitForm = $("#submitForm");
    var errorContainer = $("#errorContainer");
    var errorText = $("#errorText");
    var searchSubmit = $("#submitSearch");
    //Iterate through rows
    itemRows.each(function(i){
        itemRows[i].onclick = function(){
            //On click redirect to user page
            var itemName = $(itemRows[i]).children(":first").text();
            window.location.href = "/items/"+itemName;
        };
    });

    searchSubmit.click(function(){
        var searchVal = $("#searchBar").val();
        console.log(searchVal);

        //Make request to delete user
        var requestConfig = {
            method: "Get",
            url: "/items/"+searchVal,
            contentType: 'application/json',
            error:function(){
                $("#searchResponse").removeClass("hidden");
                $("#searchResponse").text("Could not find item");
            }
        };

        $.ajax(requestConfig).then(function (responseMessage){
            console.log(responseMessage);
            //If we got a response populate the page
            if( responseMessage ){
                window.location.href = "/items/"+searchVal;

            }
        });
        
        return false;
    });

    submitForm.click(function(){
        try{
            var itemName = $("#itemName");
            var category = $("#category");
            var description = $("#description");
            var quantity = $("#itemQuantity");
            var price = $("#price");

            var itemNameVal = itemName.val();
            var categoryVal = category.val();
            var descriptionVal = description.val();
            var quantityVal = quantity.val();
            var priceVal = price.val(); 

            console.log(itemNameVal);
            console.log(quantityVal);

            if( itemNameVal == "" ){
                throw Error("Must give an item name");
            }
            if( categoryVal == "" ){
                throw Error("Must give a category");
            }
            if( !descriptionVal ){
                throw Error("Must give a description");
            }
            if( !quantityVal || quantityVal < 0){
                throw Error("Must give a quantity");
            }
            if( !priceVal ){
                throw Error("Must give a price");
            }
            
            errorContainer.addClass("hidden");

            //Make request to delete user
            var requestConfig = {
                method: "Post",
                url: "/items/add/",
                data: JSON.stringify({
                    "itemName":itemNameVal,
                    "description": descriptionVal,
                    "itemQuantity": quantityVal,
                    "price": priceVal,
                    "category": categoryVal
                }),
                contentType: 'application/json'
            };

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

        }catch(e){
            errorContainer.removeClass("hidden");
            errorText.text(e.message);
        }
        

        return false;
    });
})();
