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

        var apiData = {
            "type": "create-user",
            "sender": "A-Team",
            "payload": {
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "password": user.password,
                "contact": user.contact,
                "email": user.email
            },
            "tags": [
                "user", "account"
            ]
        }

        $.ajax({
            type: "POST",
            url: "http://194.94.239.125:9000",
            data: apiData,
            success: success,
            dataType: dataType
        })  

    }
}