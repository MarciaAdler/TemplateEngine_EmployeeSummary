var inquirer = require("inquirer");
var jest = require("jest");

const Manager = require('./manager.js');

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
            var name = data.name;
            var title = data.title;
            var id = data.id; 
            if(role==='Manager'){
                roleManager(name,id,title);
            }
            if(role==='Engineer'){
                roleEngineer();
            }
            if(role==='Intern'){
                roleIntern();
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
            var manager = new Manager(name,id,title,data.officeNumber);
            console.log(manager.getName())
        })
}
function roleEngineer(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your GitHub Username?",
                name: "username" 
            },
        ])
}
function roleIntern(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your School?",
                name: "school" 
            },
        ])
}

 generalInfo();   