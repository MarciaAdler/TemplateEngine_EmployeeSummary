class Employee {
    constructor(name,id,title){
        this.name = name;
        this.id = id;
        this.title = title;
    }
    getName(){
       return this.name; 
    }
    getId(){
        return this.id;
    }
    getEmail() {
        return this.name +'@fakemail.com';
    }
    getRole(){
        return this.title;
    }    
}

module.exports = Employee;