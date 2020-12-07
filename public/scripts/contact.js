//runs when send button is clicked
function sendEmail() {
    $("#sendButton").remove();

    let msg = document.createElement("p");
    msg.innerText = "Email sent to someone@example.com";
    $("#emailForm").append(msg);
}