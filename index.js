const inquirer = require("inquirer");
const jest = require("jest");
const fs = require('fs');
const util = require("util");

const Manager = require('./lib/manager.js');
const Engineer = require('./lib/engineer.js');
const Intern = require('./lib/intern.js');
const team = [];
// check is team is empty
const addTeamMember = () => {
    if(team.length > 0){

        inquirer.prompt([
            {
                type: "list",
                name: "title",
                message: "What type of team member are you?",
                choices: ["Engineer","Intern","Print Team"]
            },
        ]).then (({ title }) => {
            if (title === "Engineer"){
                addEngineer();
            } else if (title === "Intern"){
                addIntern();
            } else if (title === "Print Team"){
                printTeam();
            }
        }) 
    } else {
        addManager();
    }    
}

function addManager(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name", 
            },
            {
                type: "input",
                message: "What is your id?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber", 
            },
            
           
        ]).then((response)=> {
            const { name, id, email, officeNumber } = response;
            const manager = new Manager(
            name,
            id,
            email,
            officeNumber
            );
            team.push(manager);
            console.log(team);
            addTeamMember();
            
            //console.log(manager.getName(),manager.getRole(),manager.getId());
            
        })
}
function addEngineer(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name", 
        },
        {
            type: "input",
            message: "What is your id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your GitHub Username?",
            name: "github" 
        },
    ]).then((response)=>{
        const { name, id, email, github } = response;
        const engineer = new Engineer(
        name,
        id,
        email,
        github
        );
        team.push(engineer);
        console.log(team);
        addTeamMember();
        //console.log(engineer.getName(),engineer.getRole(),data.username);
    })
}
function addIntern(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your id?",
            name: "id",
        },
        {
            type: "input",
            message:"What is your email?",
            name: 'email',
        },
        {
            type: "input",
            message: "What is your School?",
            name: "school" 
        },
    ]).then((response)=>{
            const { name, id, email, school } = response;
            const intern = new Intern(
            name,
            id,
            email,
            school
            );
            team.push(intern);
            console.log(team);
            addTeamMember();
            //console.log(intern.getName(),intern.getRole(),data.school);

    })
}
function printTeam(){
    const readFileAsync = util.promisify(fs.readFile);
    const appendFileAsync = util.promisify(fs.appendFile);
    team.forEach(async teamMember =>{ 
        if(teamMember.getRole()==="Manager"){
            const { name, id, email, officeNumber } = teamMember;
            async function updateManagerHTML() {
                const managerHTML = await readFileAsync('./templates/manager.html', 'utf8');
                const updatedManagerHTML =  managerHTML.replace(`{{ Name }}`, `${name}`).replace(`{{ title }}`, `Manager`).replace(`{{ id }}`, `${id}`).replace(`{{ email }}`, `${email}`).replace(`{{ officeNum }}`, `${officeNumber}`);
                
                await appendFileAsync('./templates/main.html',updatedManagerHTML, 'utf8', (error,data) => {
                    if(error) throw error;
                   console.log('Manager success');
                   
               })
               
             }
             updateManagerHTML(); 
        } else if (teamMember.getRole()==="Engineer"){
            const { name, id, email, github } = teamMember;
            async function updateEngineerHTML() {
                const engineerHTML = await readFileAsync('./templates/engineer.html', 'utf8');
                const updatedEngineerHTML =  engineerHTML.replace(`{{ Name }}`, `${name}`).replace(`{{ title }}`, `Engineer`).replace(`{{ id }}`, `${id}`).replace(`{{ email }}`, `${email}`).replace(`{{ username }}`,`${github}`);
                console.log(`${github}`);
                await appendFileAsync('./templates/main.html',updatedEngineerHTML, 'utf8', (error,data) => {
                    if(error) throw error;
                    console.log('Engineer success');
                })
                
             }
             updateEngineerHTML();
             
        }else if (teamMember.getRole()==="Intern"){
            const { name, id, email, school } = teamMember;
            async function updateInternHTML() {
                const InternHTML = await readFileAsync('./templates/intern.html', 'utf8');
                const updatedInternHTML =  InternHTML.replace(`{{ Name }}`, `${name}`).replace(`{{ title }}`, `Intern`).replace(`{{ id }}`, `${id}`).replace(`{{ email }}`, `${email}`).replace(`{{ school }}`,`${school}`);
                
                await appendFileAsync('./templates/main.html',updatedInternHTML, 'utf8', (error,data) => {
                    if(error) throw error;
                    console.log('Intern success');
                })
                
             }
             updateInternHTML();
  
        } 
    })
    
}




addTeamMember();
  