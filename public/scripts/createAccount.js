//for stuff later
var skillsCount = 0;
var createXP = false;

//functions
//what occurs when the add experience button is added
function addExperience() {
    $("#xpButton").remove();
    createXP = true;
    //creates div
    let createContainer = document.createElement("div");
    createContainer.setAttribute("id", "createContainer");
    //creates an input and a label for the input
    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("id", "titleNew");
    let titleText = document.createElement("label");
    titleText.setAttribute("for", "titleNew");
    titleText.innerText = "Title: ";

    let company = document.createElement("input");
    company.setAttribute("type", "text");
    company.setAttribute("name", "company");
    company.setAttribute("id", "companyNew");
    let companyText = document.createElement("label");
    companyText.setAttribute("for", "companyNew");
    companyText.innerText = "Company: ";

    let location = document.createElement("input");
    location.setAttribute("type", "text");
    location.setAttribute("name", "location");
    location.setAttribute("id", "locationNew");
    let locationText = document.createElement("label");
    locationText.setAttribute("for", "locationNew");
    locationText.innerText = "Location: ";

    let startDate = document.createElement("input");
    startDate.setAttribute("type", "text");
    startDate.setAttribute("name", "startDate");
    startDate.setAttribute("id", "startDateNew");
    let startDateText = document.createElement("label");
    startDateText.setAttribute("for", "startDateNew");
    startDateText.innerText = "Start Date: ";

    let endDate = document.createElement("input");
    endDate.setAttribute("type", "text");
    endDate.setAttribute("name", "endDate");
    endDate.setAttribute("id", "endDateNew");
    let endDateText = document.createElement("label");
    endDateText.setAttribute("for", "endDateNew");
    endDateText.innerText = "End Date: ";

    let br = document.createElement("br");
    //appends everything to div then append to div in html
    createContainer.append(titleText);
    createContainer.append(title);
    createContainer.append(br.cloneNode());
    createContainer.append(br.cloneNode());
    createContainer.append(companyText);
    createContainer.append(company);
    createContainer.append(br.cloneNode());
    createContainer.append(br.cloneNode());
    createContainer.append(locationText);
    createContainer.append(location);
    createContainer.append(br.cloneNode());
    createContainer.append(br.cloneNode());
    createContainer.append(startDateText);
    createContainer.append(startDate);
    createContainer.append(br.cloneNode());
    createContainer.append(br.cloneNode());
    createContainer.append(endDateText);
    createContainer.append(endDate);
    $("#experience").append(createContainer);
}
//same thing here
function addSkills() {
    $("#skillsButton").remove();
    if(skillsCount > 0) {
        $("#anotherBtn").remove();
    }

    let skillString = "skill" + skillsCount;
    skillsCount++;

    let skillBox = document.createElement("input");
    skillBox.setAttribute("type", "text");
    skillBox.setAttribute("name", "skill");
    skillBox.setAttribute("id", skillString);
    let skillText = document.createElement("label");
    skillText.setAttribute("for", skillString);
    skillText.innerText = "Add Skill: ";

    let another = document.createElement("input");
    another.setAttribute("type", "button");
    another.setAttribute("value", "Add Another Skill");
    another.setAttribute("id", "anotherBtn");
    another.setAttribute("onclick", "addSkills()");

    $("#skills").append(skillText);
    $("#skills").append(skillBox);
    $("#skills").append(document.createElement("br"));
    $("#skills").append(another);
}
//what occurs when create account is clicked
function createAccount() {
    //sets the values of the text boxes to a variable
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let major = $("#major").val();
    let title = '';
    let company = '';
    let location = '';
    let startDate = '';
    let endDate = '';
    if(createXP = true) {
        title = $("#titleNew").val();
        company = $("#companyNew").val();
        location = $("#locationNew").val();
        startDate = $("#startDateNew").val();
        endDate = $("#endDateNew").val();
    }
    //cant put an array in a url so i did this
    let skills = '&skills=';
    for(let i = 0; i < skillsCount; i++) {
        let skillString = "#skill" + i;
        let text = '_' + $(skillString).val();
        skills += text;
    }
    let countText = '&count=' + skillsCount;
    skills += countText;
    //GET method, idk why, which sends the variables to routes/profile.js
    //the route is looking for /profile/create and anything after doesnt matter
    //go to routes/profile.js for more comments
    $.ajax({
            method: 'GET',
            url: '/profile/create?fName='+ fName + '&lName=' + lName + '&username=' + username + '&password=' + password + '&major=' + major + '&title=' + title + '&company=' + company + '&location=' + location + '&start=' + startDate + '&end=' + endDate + skills,
            success: function(data){
                    $("#createAccButton").remove();
                    let msg = document.createElement("p");
                    msg.innerText = "Account created, go to the login page to log in with your credentials.";
                    $("#form").append(msg);
            }
    })
}