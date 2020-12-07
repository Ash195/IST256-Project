let foundUser = '';
let foundPass = '';

//when submit thing is clicked do validateAccount function
document.querySelector("#submit").addEventListener("click", validateAccount);

function validateAccount(){
    let usernameInput = $("#username").val();
    let passwordInput = $("#password").val();
    findPersonAndMatch(usernameInput, passwordInput);
}

function findPersonAndMatch(user, pass) {

    $.ajax({
        method: 'GET',
        url: '/profile/person?user=' + user,
        success: function(data){
            
            foundUser = data.username;
            foundPass = data.password;
            if(foundUser == user && foundPass == pass){
                createCurrentUser(user);
                location.href = "profile.html";
            }
            else{
                alert("Your username or password is invalid. Please try again.");
            }
        },
        error: function (request, status, error) {
            alert("User not found");
        }
    })
}

function createCurrentUser(user) {
    $.ajax({
        method: 'GET',
        url: '/profile/login?user=' + user,
        success: function(data){
            
        }
    })
}
