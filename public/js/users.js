(function(){
    //Get all rows on the page
    var userRows = $(".itemRow");
    var submitForm = $("#submitForm");
    var errorContainer = $("#errorContainer");
    var errorText = $("#errorText");

    //Iterate through rows
    userRows.each(function(i){
        userRows[i].onclick = function(){
            //On click redirect to user page
            var username = $(userRows[i]).children(":first").text();
            window.location.href = "/users/"+username;
        };
    });
    submitForm.click(function(){
        try{
            var username = $("#username");
            var password = $("#password");
            var firstName = $("#firstName");
            var lastName = $("#lastName");
            var roles = $("#roles");

            var usernameValue = username.val();
            var passwordValue = password.val();
            var firstNameValue = firstName.val();
            var lastNameValue = lastName.val();
            var rolesValue = roles.val();

            if( usernameValue == "" ){
                throw Error("Must give a username");
            }
            if( passwordValue == "" ){
                throw Error("Must give a password");
            }
            if( firstNameValue == "" ){
                throw Error("Must give a first name");
            }
            if( lastNameValue == "" ){
                throw Error("Must give a last name");
            }
            if( rolesValue == "" ){
                throw Error("Must give a role");
            }
            
            errorContainer.addClass("hidden");

            //Make request to delete user
            var requestConfig = {
                method: "Post",
                url: "/users/add/",
                data: JSON.stringify({
                    "username":usernameValue,
                    "password":passwordValue,
                    "firstName":firstNameValue,
                    "lastName":lastNameValue,
                    "roles":rolesValue
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
                    $("#usersTable tr:last").after('<tr class="itemRow"><td>'+responseMessage.username+'</td><td>'
                    +responseMessage.firstName+'</td><td>'
                    +responseMessage.lastName+'</td><td>'
                    +responseMessage.roles+'</td></tr>');
                    
                }
            });

        }catch(e){
            errorContainer.removeClass("hidden");
            errorText.text(e.message);
        }
        

        return false;
    });
})();
