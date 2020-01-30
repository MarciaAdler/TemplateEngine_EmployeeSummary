const Employee = require('./employee.js')
class Engineer extends Employee{
    constructor(name,id,title,username){
        super(name,id,title);
        this.gitHub = username; 
    }
}
module.exports = Engineer