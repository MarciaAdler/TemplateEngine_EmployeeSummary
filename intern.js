const Employee = require('./employee.js')
class Intern extends Employee{
    constructor(name,id,title,school){
        super(name,id,title);
        this.school = school; 
    }
}
module.exports = Intern