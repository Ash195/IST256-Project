//json - am unsure as to how to read the json file at the moment

//var request = require('request');
var access_token = 'AQXgR53pieLNelZaDEufOYRNwUOEplAuhaMCpADP4qNEyUu1wWG40AekaL3TP_yLd5KIz0mFWfbf-N1rkqHhIFlG4aIDlmT6qtPvvckzcCeFBAx-G75q_Fdc_EYWi6imsksjnzeTQ6iwHy5FKoG5SnmI9sskjRQqgKEkB4x81Tg1_wXo9zO4UAc-2Zk6-NkgGkXJP_cRH7YkRAHV9GKWh7egvx-jLXgqwOCPHN6iWzR3fWNHrl0WRSpfWloFGx1PQ_CCg-hAEnW5nF37USzMMneJfhvuJup6Az5VrWw0B1U3M65GJpHqj5BIJoP3ZAbiRBBoCaYUpVewdo404-ZyQSok8QbLew';

callAPI(access_token);

function callAPI(accessToken) {
        $.ajax({
            url: 'https://api.linkedin.com/v2/me',
            method: 'GET',
            beforeSend: function(xhr){xhr.setRequestHeader("Authorization", "Bearer "+accessToken);},
            success: success
        })
    }

function success(data) {
        console.log(data);
}

/*unction callMeAPI(accessToken, done){
	request.get({url:"https://api.linkedin.com/v2/me",headers:{"Authorization": "Bearer "+accessToken}}, function(err,res,responseBody){
		if (err) {
			console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
	});
}

function callEmailAPI(accessToken, done){
	request.get({url:"https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",headers:{"Authorization": "Bearer "+accessToken}}, function(err,res,responseBody){
		if (err) {
			console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
	});
}

function main(done){
	callMeAPI(access_token,function(err, res){
		if (err) {done(err)}
		else{
			var firstname = res.localizedFirstName;
			var lastname = res.localizedLastName;
			callEmailAPI(access_token,function(err, res){
				if (err) {done(err)}
				else{
					var email = res.elements[0]["handle~"].emailAddress;
					console.log(firstname+" "+lastname+" "+email);
					done(null,"success");
				}
			});
		}
	});
}*/

main(function(a,b){});

var usersJSON = '{ "users": [' +
            '{ "firstName": "Kelvin", "lastName": "Trang", "major": "Human-Centered Design & Development",' +
            '"experiences": { "experience1": { "company": "Hughes Network Systems", "title": "Network Security Intern",' +
                    '"location": "Germantown, MD", "startDate": "June 2019", "endDate": "Jan 2020" },' +
            '"experience2": { "company": "Penn State IT Service Desk", "title": "IT Consultant", "location": "University Park, PA",' +
                    '"startDate": "Oct 2020", "endDate": "Present" } },' +
            '"skills": [ "Java", "Linux", "HTML", "CSS", "JavaScript"], "profilePic": "./images/kelvin_profile.jpg" } ] }';

let users = JSON.parse(usersJSON);
/*let header = $("#header");

//profile picture
let img = document.createElement("img");
img.src = users.users[0].profilePic;
img.alt = users.users[0].firstName + "'s Profile Picture";
img.width = 200;
img.height = 200;
header.append(img);

//name of user
let profileHeader = document.createElement("h1");
profileHeader.innerText = users.users[0].firstName + " " + users.users[0].lastName;
header.append(profileHeader);

//experiences
let body = $("#body");
let xpHeader = document.createElement("h2");
xpHeader.innerText = "Experiences";
body.append(xpHeader);
Object.keys(users.users[0].experiences).forEach(key => {
        let experience = users.users[0].experiences[key];

        let company = document.createElement("h3");
        company.innerText = experience.company;
        company.class = "company";

        let title = document.createElement("p");
        title.innerText = experience.title;
        title.class = "title";

        let location = document.createElement("p");
        location.innerText = experience.location;
        location.class = "location";

        let startDate = experience.startDate;
        let endDate = experience.endDate;
        let date = document.createElement("p");
        date.innerText = startDate + " - " + endDate;
        date.class = "date";

        body.append(company);
        body.append(location);
        body.append(title);
        body.append(date);
      });

//skills
let skills = document.createElement("h4");
skills.innerText = "Skills";
skills.class = "skills";
body.append(skills);

let skillsList = document.createElement("ul");
for(let i = 0; i < users.users[0].skills.length; i++) {
        let skill = document.createElement("li");
        skill.innerText = users.users[0].skills[i];
        skillsList.appendChild(skill);
}
body.append(skillsList);

//referenced w3schools and stackoverflow along with the textbook and notes*/