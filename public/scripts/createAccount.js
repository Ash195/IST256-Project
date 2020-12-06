var skillsCount = 0;

//functions
function addExperience() {
    $("#xpButton").remove();

    let createContainer = document.createElement("div");
    createContainer.setAttribute("id", "createContainer");

    let xpHeader = document.createElement("h2");
    xpHeader.setAttribute("id", "xpHeader");
    xpHeader.innerText = "Experiences";

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

    createContainer.append(xpHeader);
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
    createContainer.append(br.cloneNode());
    $("#experience").append(createContainer);
}

/*function createExperience() {
    let title = $("#titleNew").val();
    let company = $("#companyNew").val();
    let location = $("#locationNew").val();
    let startDate = $("#startDateNew").val();
    let endDate = $("#endDateNew").val();

    $.ajax({
            method: 'GET',
            url: '/profile/experiences/create?title=' + title + '&company=' + company + '&location=' + location + '&start=' + startDate + '&end=' + endDate,
            success: function(data){
                    $("#newXP").html("");
                    let msg = document.createElement("p");
                    msg.innerText = "Experience created, refresh page to view results";
                    $("#newXP").append(msg);
            }
    })
}*/

function addSkills() {
    $("#skillsButton").remove();

    let skillsContainer = document.createElement("div");
    skillsContainer.setAttribute("id", "skillsContainer");

    skillCount++;
    let skillString = "skill" + skillCount;

    let skillBox = document.createElement("input");
    skillBox.setAttribute("type", "text");
    skillBox.setAttribute("name", "skill");
    skillBox.setAttribute("id", skillString);
    let skillText = document.createElement("label");
    skillText.setAttribute("for", skillString);
    skillText.innerText = "Add Skill: ";

    let br = document.createElement("br");

    skillsContainer.append(skillText);
    skillsContainer.append(skillBox);
    
    $("#skills").append(skillsContainer);
}