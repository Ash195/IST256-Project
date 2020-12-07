let header = $("#header");

findCurrentUser();

//profile picture
let img = document.createElement("img");
img.src = "./images/tempProfilePic.jpg"
img.alt = "Profile Picture";
img.width = 200;
img.height = 200;
header.append(img);

//experiences
let xp = $("#experiences");
var xpCount = 0;
var experienceTitles = [];
var experienceID = [];
var currentXP;
showExperiences();

//skills
var skillsArray = [];
showSkills();

//functions for experiences
//gets current user and displays header
function findCurrentUser() {
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data){
                        //name
                        let profileHeader = document.createElement("h1");
                        profileHeader.id = "name";
                        profileHeader.innerText = data.firstName + " " + data.lastName;
                        header.append(profileHeader);
                }
            })
}

//runs when add new experience button is clicked, shows text boxes and create button
function addExperience() {
        $("#xpButton").remove();

        let createContainer = document.createElement("div");
        createContainer.setAttribute("id", "createContainer");

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

        let create = document.createElement("input");
        create.setAttribute("type", "button");
        create.setAttribute("value", "Create");
        create.setAttribute("id", "createBtn");
        create.setAttribute("onclick", "createExperience()");


        let br = document.createElement("br");

        createContainer.append(titleText);
        createContainer.append(title);
        createContainer.append(br.cloneNode());
        createContainer.append(companyText);
        createContainer.append(company);
        createContainer.append(br.cloneNode());
        createContainer.append(locationText);
        createContainer.append(location);
        createContainer.append(br.cloneNode());
        createContainer.append(startDateText);
        createContainer.append(startDate);
        createContainer.append(br.cloneNode());
        createContainer.append(endDateText);
        createContainer.append(endDate);
        createContainer.append(br.cloneNode());
        createContainer.append(create);
        $("#newXP").append(createContainer);
}

//runs when create button is clicked, creates new experience in the database
function createExperience() {
        let title = $("#titleNew").val();
        let company = $("#companyNew").val();
        let location = $("#locationNew").val();
        let startDate = $("#startDateNew").val();
        let endDate = $("#endDateNew").val();
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data) {
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/createXP?user=' + data.username + '&title=' + title + '&company=' + company + '&location=' + location + '&start=' + startDate + '&end=' + endDate,
                                success: function(data){
                                        $("#newXP").html("");
                                        let msg = document.createElement("p");
                                        msg.innerText = "New experience created, refresh page to view results";
                                        $("#newXP").append(msg);
                        }
                })
                }
        })
        
}

//updates page with experiences from database
function showExperiences() {
        xp.html("");
        let xpHeader = document.createElement("h2");
        xpHeader.setAttribute("id", "xpHeader");
        xpHeader.innerText = "Experiences";
        xp.append(xpHeader);
        xpCount = 0;
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data){
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/experiences?user=' + data.username,
                                success: function(info){
                                        Object.keys(info).forEach(key => {
                                                let experience = info[key];
                                        
                                                let container = document.createElement("div");
                                                container.classList.add("experience");
                                                let container2 = document.createElement("div");
                                                container2.classList.add("experience2");
                                        
                                                let title = document.createElement("h3");
                                                title.innerText = experience.title;
                                                title.classList.add("title");
                                                experienceTitles.push(experience.title);
                                        
                                                let company = document.createElement("p");
                                                company.innerText = experience.company;
                                                company.classList.add("company");
                                        
                                                let location = document.createElement("p");
                                                location.innerText = experience.location;
                                                location.classList.add("location");
                                        
                                                let startDate = experience.startDate;
                                                let endDate = experience.endDate;
                                                let date = document.createElement("p");
                                                date.innerText = startDate + " - " + endDate;
                                                date.classList.add("date");
                                                
                                                experienceID.push(experience._id);
                                        
                                                container.append(title);
                                                container2.append(company);
                                                container2.append(location);
                                                container2.append(date);
                                                container.append(container2);
                                                xp.append(container);
                                                xpCount++;
                                              });
                                }
                        })
                }
        })
}

//shows radio buttons and delete/update button when edit experience button is clicked
function editExperience() {
        $("#editButton").remove();

        for(let i = 0; i < xpCount; i++) {
                let radio = document.createElement("input");
                radio.setAttribute("type", "radio");
                radio.setAttribute("id", experienceTitles[i]);
                radio.setAttribute("value", experienceID[i]);
                radio.setAttribute("name", "XP");

                let label = document.createElement("label");
                label.setAttribute("for", experienceTitles[i]);
                label.innerHTML = experienceTitles[i];

                $("#editXP").append(radio);
                $("#editXP").append(label);
                $("#editXP").append(document.createElement("br"));
        }
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "Delete");
        deleteButton.setAttribute("id", "delButton");
        deleteButton.setAttribute("onclick", "deleteExperience()");
        let update = document.createElement("input");
        update.setAttribute("type", "button");
        update.setAttribute("value", "Update");
        update.setAttribute("id", "updateButton");
        update.setAttribute("onclick", "showUpdateExperience()");
        $("#editXP").append(document.createElement("br"));
        $("#editXP").append(deleteButton);
        $("#editXP").append(update);
}

//runs when delete button is clicked, deletes selected experience
function deleteExperience() {
        let radios = document.getElementsByName('XP');
        var xpID;
        for(let i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                        xpID = radios[i].value;
                }
        }
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data){
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/experiences/delete?user='+ data.username + '&id=' + xpID,
                                success: function(data){
                                        location.href = "profile.html";
                                }
                        })
                }
        })
}

//runs when update button is clicked, shows form with values of selected experience
function showUpdateExperience() {
        let radios = document.getElementsByName('XP');
        for(let i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                        currentXP = radios[i].value;
                }
        }
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(user){
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/experience?user='+ user.username + '&id=' + currentXP,
                                success: function(data){
                                        $("#editXP").html("");

                                        let updateContainer = document.createElement("div");
                                        updateContainer.setAttribute("id", "updateContainer");

                                        let title = document.createElement("input");
                                        title.setAttribute("type", "text");
                                        title.setAttribute("name", "title");
                                        title.setAttribute("value", data.title);
                                        title.setAttribute("id", "titleUpdate");
                                        let titleText = document.createElement("label");
                                        titleText.setAttribute("for", "titleUpdate");
                                        titleText.innerText = "Title: ";

                                        let company = document.createElement("input");
                                        company.setAttribute("type", "text");
                                        company.setAttribute("name", "company");
                                        company.setAttribute("value", data.company);
                                        company.setAttribute("id", "companyUpdate");
                                        let companyText = document.createElement("label");
                                        companyText.setAttribute("for", "companyUpdate");
                                        companyText.innerText = "Company: ";

                                        let location = document.createElement("input");
                                        location.setAttribute("type", "text");
                                        location.setAttribute("name", "location");
                                        location.setAttribute("value", data.location);
                                        location.setAttribute("id", "locationUpdate");
                                        let locationText = document.createElement("label");
                                        locationText.setAttribute("for", "locationUpdate");
                                        locationText.innerText = "Location: ";

                                        let startDate = document.createElement("input");
                                        startDate.setAttribute("type", "text");
                                        startDate.setAttribute("name", "startDate");
                                        startDate.setAttribute("value", data.startDate);
                                        startDate.setAttribute("id", "startDateUpdate");
                                        let startDateText = document.createElement("label");
                                        startDateText.setAttribute("for", "startDateUpdate");
                                        startDateText.innerText = "Start Date: ";

                                        let endDate = document.createElement("input");
                                        endDate.setAttribute("type", "text");
                                        endDate.setAttribute("name", "endDate");
                                        endDate.setAttribute("value", data.endDate);
                                        endDate.setAttribute("id", "endDateUpdate");
                                        let endDateText = document.createElement("label");
                                        endDateText.setAttribute("for", "endDateUpdate");
                                        endDateText.innerText = "End Date: ";

                                        let update = document.createElement("input");
                                        update.setAttribute("type", "button");
                                        update.setAttribute("value", "Update");
                                        update.setAttribute("id", "updateBtn");
                                        update.setAttribute("onclick", "updateExperience()");

                                        let br = document.createElement("br");

                                        updateContainer.append(titleText);
                                        updateContainer.append(title);
                                        updateContainer.append(br.cloneNode());
                                        updateContainer.append(companyText);
                                        updateContainer.append(company);
                                        updateContainer.append(br.cloneNode());
                                        updateContainer.append(locationText);
                                        updateContainer.append(location);
                                        updateContainer.append(br.cloneNode());
                                        updateContainer.append(startDateText);
                                        updateContainer.append(startDate);
                                        updateContainer.append(br.cloneNode());
                                        updateContainer.append(endDateText);
                                        updateContainer.append(endDate);
                                        updateContainer.append(br.cloneNode());
                                        updateContainer.append(update);
                                        $("#editXP").append(updateContainer);
                                }
                        })
                }
        })
}

//runs when second update button is clicked, updates values of experience in database from input values
function updateExperience() {
        let title = $("#titleUpdate").val();
        let company = $("#companyUpdate").val();
        let location = $("#locationUpdate").val();
        let startDate = $("#startDateUpdate").val();
        let endDate = $("#endDateUpdate").val();

        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data){
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/experiences/update?user='+ data.username + '&id=' + currentXP + '&title=' + title + '&company=' + company + '&location=' + location + '&start=' + startDate + '&end=' + endDate,
                                success: function(data){
                                        $("#editXP").html("");
                                        let msg = document.createElement("p");
                                        msg.innerText = "Experience updated, refresh page to view results";
                                        $("#editXP").append(msg);
                                }
                        })
                }
        })
}

//functions for skills
function showSkills(){
        let skillsContainer = $("#skills");

        skillsContainer.html("");
        let skillsHeader = document.createElement("h2");
        skillsHeader.setAttribute("id", "skillsHeader");
        skillsHeader.innerText = "Skills";
        skillsContainer.append(skillsHeader);

        let skillsList = document.createElement("ul");
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data){
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/skills?user=' + data.username,
                                success: function(skills){
                                        for(let i = 0; i < skills.length; i++) {
                                                let skill = document.createElement("li");
                                                skill.innerText = skills[i];
                                                skillsList.appendChild(skill);
                                                skillsArray.push(skills[i]);
                                        }
                                }
                        })
                }
        })
        
        skillsContainer.append(skillsList);
}

function addSkill() {
        $("#addSkillButton").remove();

        let skillBox = document.createElement("input");
        skillBox.setAttribute("type", "text");
        skillBox.setAttribute("name", "skill");
        skillBox.setAttribute("id", "skillNew");
        let skillText = document.createElement("label");
        skillText.setAttribute("for", "skillNew");
        skillText.innerText = "Add Skill: ";

        let confirm = document.createElement("input");
        confirm.setAttribute("type", "button");
        confirm.setAttribute("value", "Confirm");
        confirm.setAttribute("id", "confirmSkill");
        confirm.setAttribute("onclick", "confirmSkill()");

        $("#addSkill").append(skillText);
        $("#addSkill").append(skillBox);
        $("#addSkill").append(document.createElement("br"));
        $("#addSkill").append(confirm);
}

function confirmSkill() {
        let skill = $("#skillNew").val();

        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data) {
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/skills/add?user=' + data.username + "&skill=" + skill,
                                success: function(data) {
                                        $("#addSkill").html("");
                                        let msg = document.createElement("p");
                                        msg.innerText = "New skill added, refresh page to view results";
                                        $("#addSkill").append(msg);
                                }
                        })
                }
        })
}

function editSkills() {
        $("#editSkillsButton").remove();

        for(let i = 0; i < skillsArray.length; i++) {
                let radio = document.createElement("input");
                radio.setAttribute("type", "radio");
                radio.setAttribute("id", skillsArray[i]);
                radio.setAttribute("value", i);
                radio.setAttribute("name", "Skill");

                let label = document.createElement("label");
                label.setAttribute("for", skillsArray[i]);
                label.innerHTML = skillsArray[i];

                $("#editSkills").append(radio);
                $("#editSkills").append(label);
                $("#editSkills").append(document.createElement("br"));
        }
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "Delete");
        deleteButton.setAttribute("id", "delButton");
        deleteButton.setAttribute("onclick", "deleteSkill()");
        $("#editSkills").append(document.createElement("br"));
        $("#editSkills").append(deleteButton);
}

function deleteSkill() {
        let radios = document.getElementsByName('Skill');
        var skillIndex = 0;
        for(let i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                        skillIndex = radios[i].value;
                }
        }
        $.ajax({
                method: 'GET',
                url: '/profile/findCurrentUser',
                success: function(data){
                        $.ajax({
                                method: 'GET',
                                url: '/profile/person/skills/delete?user='+ data.username + '&index=' + skillIndex,
                                success: function(data){
                                        location.href = "profile.html";
                                }
                        })
                }
        })
}
//referenced w3schools and stackoverflow along with the textbook and notes