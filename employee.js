class Employee {
    constructor(name,id,title){
        this.name = name;
        this.id = id;
        this.title = title;
    }
    getName(){
       return this.name; 
    }
    getid(){
        return this.id;
    }
    getEmail() {
        return this.name +'@fakemail.com';
    }
    getRole(){
        return 'Employee';
    }    
}

module.exports = Employee;