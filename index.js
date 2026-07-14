// Assignment 1.2: Review and Practice HTML/CSS/JavaScript
// Carmen Amond 07/12/26

const school = "the University of Advancing Technology";

const student = {
    name: "Carmen Amond",
    major: "Computer Science",
    email: "carmen.amond@university.edu",
    gradYear: 2028
};

function showGreeting(userName){
    document.getElementById("userName").textContent = userName;
    console.log("Hello " + userName + "!");
    console.log("Welcome to " + school);
}

function info(major, email){
    document.getElementById("major").textContent = major;
    document.getElementById("email").textContent = email;
    console.log("Your major is " + major);
    console.log("Your school email is " + email);
}

function gradTime(gradYear){
    document.getElementById("gradYear").textContent = gradYear;
    console.log("You will graduate in " + gradYear);
}

showGreeting("Carmen");
info("Computer Science", "carmen.amond@university.edu");
gradTime(2028);
