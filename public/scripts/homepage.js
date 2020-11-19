//when purposeButton is clicked the ?s will be swapped with info

document.querySelector("#purposeButton").addEventListener("click", swapInfo);

var questionMarks = "?, ?, ?";
var purposeA = "Find a career of your dreams";
var purposeB = "Learn new skills";
var purposeC = "Make connections";

//add the info for loop
function swapInfo(){
    let x = document.querySelector("#QuestionA");
    if(x.textContent.indexOf("Questions") != -1) {
        x.innerHTML = questionMarks;
    }
    else{
        x.innerHTML = purposeA;
    }

    let y = document.querySelector("#QuestionB");
    if(y.textContent.indexOf("Questions") != -1) {
        y.innerHTML = questionMarks;
    }
    else{
        y.innerHTML = purposeB;
    }

    let z = document.querySelector("#QuestionC");
    if(z.textContent.indexOf("Questions") != -1) {
        z.innerHTML = questionMarks;
    }
    else{
        z.innerHTML = purposeC;
    }
}
