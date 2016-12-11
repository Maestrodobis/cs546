(function(){
    var deleteUser = $("#deleteUser");
    var confirmDeleteWrapper = $("#confirmDeleteWrapper");
    var cancel = $("#cancelButton");
    var confirm = $("#confirmButton");
    var username = $("#username").text();
    var rolesEditButton = $("#rolesEditButton");
    var rolesInput = $("#rolesInput");
    var rolesUpdateButton = $("#rolesUpdateButton");
    var rolesField = $("#rolesField");

    deleteUser.click(function(){
        confirmDeleteWrapper.removeClass("hidden");
    });

    cancel.click(function(){
        confirmDeleteWrapper.addClass("hidden");
    });

    confirm.click(function(){
        //Make request to delete user
        var requestConfig = {
            method: "Delete",
            url: "/users/delete/"+username,
            contentType: 'application/json'
        };
        $.ajax(requestConfig).then(function(responseMessage){
            //If we got a response populate the page
            if( responseMessage ){
                window.location.href = "/users";
            }
        });
    });

    rolesEditButton.click(function(){
        rolesInput.removeClass("hidden");
        rolesUpdateButton.removeClass("hidden");
    });

    rolesUpdateButton.click(function(){
        //Make request to update user
        var requestConfig = {
            method: "Put",
            url: "/users/update/"+username,
            data: JSON.stringify({
                "roles":rolesInput.val()
            }),
            contentType: 'application/json'
        };
        $.ajax(requestConfig).then(function (responseMessage){
            //If we got a response populate the page
            if( responseMessage ){
                rolesField.text(responseMessage.roles);
            }
        });
    });
})();
