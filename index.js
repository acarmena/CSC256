// Assignment 1.2: Review and Practice HTML/CSS/JavaScript
// Carmen Amond 07/12/26

const school = "the University of Advancing Technology";


function showGreeting(userName){
    console.log("Hello " + userName + "!");
    console.log("Welcome to " + school);
}

function info(major, email){
    console.log("Your major is " + major);
    console.log("Your school email is " + email);
}

function gradTime(gradYear){
    console.log("You will graduate in " + gradYear);
}

showGreeting("Carmen");
info("Computer Science", "carmen.amond@university.edu");
gradTime(2028);
showGreeting("Aiden");
info("Mathematics", "aiden.cassidy@university.edu");
gradTime(2032);
showGreeting("Lincoln");
info("Physics", "lincoln.willison@university.edu");
gradTime(2029);
