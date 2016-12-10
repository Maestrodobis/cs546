(function(){

    //Get all rows on the page
    var userRows = $(".itemRow");
    var deleteButtons = $(".deleteButtons");
    //Iterate through rows
    userRows.each(function(i){
        userRows[i].onclick = function(){
            //On click redirect to user page
            var username = $(userRows[i]).children(":first").text();
            window.location.href = "/users/"+username;
        };
    });
})();
