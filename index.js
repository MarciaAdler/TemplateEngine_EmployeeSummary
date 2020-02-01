const inquirer = require("inquirer");
const jest = require("jest");
const fs = require('fs');
const util = require("util");

const Manager = require('./lib/manager.js');
const Engineer = require('./lib/engineer.js');
const Intern = require('./lib/intern.js');
const team = [];
let updatedInternHTML = '';
let updatedManagerHTML = '';
let updatedEngineerHTML = '';
let teamMates = '';
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
            
            addTeamMember();
            
            
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
        
        addTeamMember();
        
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
            //console.log(team);
            addTeamMember();
            
            

    })
}
  
function printTeam(){
    //const appendFileAsync = util.promisify(fs.appendFile);
    team.forEach( teamMember =>{ 
        
        if(teamMember.getRole()==="Manager"){
            const { name, id, email, officeNumber } = teamMember;
            function updateManager() { 
                fs.readFile('./templates/manager.html', 'utf8', (err, data) => {
                    //console.log(data)
                    updatedManagerHTML =  data.replace(`{{ Name }}`, `${name}`).replace(`{{ title }}`,`Manager`).replace(`{{ id }}`, `${id}`).replace(`{{ email }}`, `${email}`).replace(`{{ officeNum }}`,`${officeNumber}`);
              
                    teamMates = teamMates.concat(updatedManagerHTML); 
         
                });  
                
            }    
            updateManager();
        } else if (teamMember.getRole()==="Engineer"){
            const { name, id, email, github } = teamMember;
            function updateEngineer(){
                fs.readFile('./templates/engineer.html','utf8', (err,data) => {
                    updatedEngineerHTML = data.replace(`{{ Name }}`, `${name}`).replace(`{{ title }}`,`Engineer`).replace(`{{ id }}`, `${id}`).replace(`{{ email }}`, `${email}`).replace(`{{ username }}`,`${github}`);
                    teamMates += updatedEngineerHTML; 
                    //console.log('success engineers',teamMates);
                    createTeamHTML();
                }) 
            }
            updateEngineer();
            
        }else if (teamMember.getRole()==="Intern"){
            const { name, id, email, school } = teamMember;
            function updateIntern(){
                fs.readFile('./templates/intern.html','utf8',(err,data)=> {
                    updatedInternHTML = data.replace(`{{ Name }}`, `${name}`).replace(`{{ title }}`,`Intern`).replace(`{{ id }}`, `${id}`).replace(`{{ email }}`, `${email}`).replace(`{{ school }}`,`${school}`);
                    
                    teamMates += updatedInternHTML;
                    createTeamHTML();
                })
            }
            updateIntern();
                
        }     
        
    })   
          
} 
         

 function createTeamHTML() {
  
    fs.readFile('./templates/teamtemplate.html', 'utf8',(err,data) =>{
        if(err) throw error;
        //console.log(data);
        const newTeamHTML =  data.replace(`{{ content }}`, teamMates);
        console.log('newTeamHTML', newTeamHTML);
        fs.writeFile('./output/team.html',newTeamHTML,'utf8',(err)=>{
            if (err) throw error;
            console.log('success');
        })
    })
}  
addTeamMember();  