var inquirer = require("inquirer");
var jest = require("jest");

const Manager = require('./manager.js');
const Engineer = require('./engineer.js');
const Intern = require('./intern.js');
function generalInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name" 
            },
            {
                type: "input",
                message: "What is your id?",
                name: "id",
            },
            {
                type: "list",
                name: "title",
                message: "what is your title?",
                choices: ["Manager","Engineer","Intern"]
            },
        ])
        .then(function(data){
            const name = data.name;
            const title = data.title;
            const id = data.id; 
            if(title==='Manager'){
                roleManager(name,id,title);
           }
            if(title==='Engineer'){
                roleEngineer(name,id,title);
            }
            if(title==='Intern'){
                roleIntern(name,id,title);
            }
        }) 
            
}      
function roleManager(name,id,title){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber" 
            },
        ]).then(function(data){
            let manager = new Manager(name,id,title,data.officeNumber);
            console.log(manager.getName(),manager.getRole(),manager.getId());
            
        })
}
function roleEngineer(name,id,title){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your GitHub Username?",
                name: "username" 
            },
        ]).then(function(data){
            let engineer = new Engineer(name,id,title,data.username);
            console.log(engineer.getName(),engineer.getRole(),data.username);
        })
}
function roleIntern(name,id,title){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your School?",
                name: "school" 
            },
        ]).then(function(data){
            let intern = new Intern(name,id,title,data.school);
            console.log(intern.getName(),intern.getRole(),data.school);
        })
}

 generalInfo();   