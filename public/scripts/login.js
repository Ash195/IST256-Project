
//when submit thing is clicked do validateAccount function
document.querySelector("#submit").addEventListener("click", validateAccount);

//create currentUser object
var currentUser = {username:"kmt5720", password:"kmt5720pass"};

function validateAccount(){
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');
    if(currentUser.username == usernameInput && currentUser.password == passwordInput){
        location.href = "profile.html";
    }
    else if(currentUser.name == username && currentUser.password != passwordInput){
        console.log("Sorry, but our password is invalid.")
    }
    else if(currentUser.name != username && currentUser.password == passwordInput){
        console.log("Sorry, but your username is invalid.")
    }
    else{
        console.log("Sorry, but your username or password is invalid.")
    }
}



/*idk if i need this lol
$.ajax({
    method: 'GET',
    url: 'profile/get?username=' + username + '&password' + password,
    success: function(data){
        
    }
})

*/