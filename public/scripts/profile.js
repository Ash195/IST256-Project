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

Object.keys(users.users[0].experiences).forEach(key => {
        let experience = users.users[0].experiences[key];

        let container = document.createElement("div");
        container.classList.add("experience");
        let container2 = document.createElement("div");
        container.classList.add("experience2");

        let title = document.createElement("h3");
        title.innerText = experience.title;
        title.classList.add("title");

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

        container.append(title);
        container2.append(company);
        container2.append(location);
        container2.append(date);
        container.append(container2);
        xp.append(container);
      });

function addExperience() {
        $("#xpButton").remove();

        let form = document.createElement("form"); 
        form.setAttribute("method", "post"); 
        form.setAttribute("action", "../create");

        let title = document.createElement("input");
        title.setAttribute("type", "text");
        title.setAttribute("name", "title");
        let titleText = document.createElement("p");
        titleText.innerText = "Title";

        let company = document.createElement("input");
        company.setAttribute("type", "text");
        company.setAttribute("name", "company");
        let companyText = document.createElement("p");
        companyText.innerText = "Company";

        let location = document.createElement("input");
        location.setAttribute("type", "text");
        location.setAttribute("name", "location");
        let locationText = document.createElement("p");
        locationText.innerText = "Location";

        let startDate = document.createElement("input");
        startDate.setAttribute("type", "text");
        startDate.setAttribute("name", "startDate");
        let startDateText = document.createElement("p");
        startDateText.innerText = "Start Date";

        let endDate = document.createElement("input");
        endDate.setAttribute("type", "text");
        endDate.setAttribute("name", "endDate");
        let endDateText = document.createElement("p");
        endDateText.innerText = "End Date";

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
        form.appendChild(submit);

        $("#xpForm").append(form);
}

//skills
let skillsContainer = $("#skills");

let skillsList = document.createElement("ul");
for(let i = 0; i < users.users[0].skills.length; i++) {
        let skill = document.createElement("li");
        skill.innerText = users.users[0].skills[i];
        skillsList.appendChild(skill);
}
skillsContainer.append(skillsList);

//referenced w3schools and stackoverflow along with the textbook and notes