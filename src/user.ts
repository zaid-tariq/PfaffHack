class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    contact: string;
    email: string;
    
    constructor(firstName: string, lastName: string, username: string, password: string, contact: string, email: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.contact = contact;
        this.email = email;
    }

    Sign_up(firstName: string, lastName: string, username: string, password: string, contact: string, email: string){
        let user = new User(firstName, lastName, username, password, contact, email);
        
    }

    Ride_Offer() {
        
    }

    Ride_Search() {

    }

}