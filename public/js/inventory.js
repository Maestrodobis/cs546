(function(){

    //Get all rows on the page
    var itemRows = $(".itemRow");
    var deleteButtons = $(".deleteButtons");
    //Iterate through rows
    itemRows.each(function(i){
        itemRows[i].onclick = function(){
            //On click redirect to user page
            var itemName = $(itemRows[i]).children(":first").text();
            window.location.href = "/items/"+itemName;
        };
    });
})();
