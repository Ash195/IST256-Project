//json
var usersJSON = '{ "users": [' +
            '{ "firstName": "Kelvin", "lastName": "Trang", "major": "Human-Centered Design & Development",' +
            '"experiences": { "experience1": { "company": "Hughes Network Systems", "title": "Network Security Intern",' +
                    '"location": "Germantown, MD", "startDate": "June 2019", "endDate": "Jan 2020" },' +
            '"experience2": { "company": "Penn State IT Service Desk", "title": "IT Consultant", "location": "University Park, PA",' +
                    '"startDate": "Oct 2020", "endDate": "Present" } },' +
            '"skills": [ "Java", "Linux", "HTML", "CSS", "JavaScript"], "profilePic": "./images/kelvin_profile.jpg" } ] }';

let users = JSON.parse(usersJSON);
let header = $("#header");

//profile picture
let img = document.createElement("img");
img.src = users.users[0].profilePic;
img.alt = users.users[0].firstName + "'s Profile Picture";
img.width = 200;
img.height = 200;
header.append(img);

//name of user
let profileHeader = document.createElement("h1");
profileHeader.id = "name";
profileHeader.innerText = users.users[0].firstName + " " + users.users[0].lastName;
header.append(profileHeader);

//experiences
let xp = $("#experiences");
var xpCount = 0;
var experienceTitles = [];
var experienceID = [];
var currentXP;
showExperiences();

//skills
let skillsContainer = $("#skills");

let skillsList = document.createElement("ul");
for(let i = 0; i < users.users[0].skills.length; i++) {
        let skill = document.createElement("li");
        skill.innerText = users.users[0].skills[i];
        skillsList.appendChild(skill);
}
skillsContainer.append(skillsList);

//functions
function addExperience() {
        $("#xpButton").remove();

        let form = document.createElement("form"); 
        form.setAttribute("method", "post"); 
        form.setAttribute("action", "../create");

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

        let submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Create");

        let br = document.createElement("br");

        form.appendChild(titleText);
        form.appendChild(title);
        form.appendChild(br.cloneNode());
        form.appendChild(companyText);
        form.appendChild(company);
        form.appendChild(br.cloneNode());
        form.appendChild(locationText);
        form.appendChild(location);
        form.appendChild(br.cloneNode());
        form.appendChild(startDateText);
        form.appendChild(startDate);
        form.appendChild(br.cloneNode());
        form.appendChild(endDateText);
        form.appendChild(endDate);
        form.appendChild(br.cloneNode());
        form.appendChild(br.cloneNode());
        form.appendChild(submit);

        $("#xpForm").append(form);
}

function showExperiences() {
        xp.html("");
        let xpHeader = document.createElement("h2");
        xpHeader.setAttribute("id", "xpHeader");
        xpHeader.innerText = "Experiences";
        xp.append(xpHeader);
        xpCount = 0;
        $.ajax({
                method: 'GET',
                url: '/profile/experiences',
                success: function(data){
                        Object.keys(data).forEach(key => {
                                let experience = data[key];
                        
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
                url: '/profile/experiences/delete?id=' + xpID,
                success: function(data){
                        $("#editXP").html("");
                        let msg = document.createElement("p");
                        msg.innerText = "Experience deleted, refresh page to view results";
                        $("#editXP").append(msg);
                }
        })
}

function showUpdateExperience() {
        let radios = document.getElementsByName('XP');
        for(let i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                        currentXP = radios[i].value;
                }
        }
        $.ajax({
                method: 'GET',
                url: '/profile/experience?id=' + currentXP,
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

function updateExperience() {
        let title = $("#titleUpdate").val();
        let company = $("#companyUpdate").val();
        let location = $("#locationUpdate").val();
        let startDate = $("#startDateUpdate").val();
        let endDate = $("#endDateUpdate").val();

        $.ajax({
                method: 'GET',
                url: '/profile/experiences/update?id=' + currentXP + '&title=' + title + '&company=' + company + '&location=' + location + '&start=' + startDate + '&end=' + endDate,
                success: function(data){
                        $("#editXP").html("");
                        let msg = document.createElement("p");
                        msg.innerText = "Experience updated, refresh page to view results";
                        $("#editXP").append(msg);
                }
        })
}
//referenced w3schools and stackoverflow along with the textbook and notes