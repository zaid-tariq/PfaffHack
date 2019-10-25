
class User {


    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    contact: string;
    email: string;
    
    constructor(){
        var apiData = {
            "type": "create-user",
            "sender": "A-Team",
            "payload": {
                "username": "user.username",
                "firstName": "user.firstName",
                "lastName": "user.lastName",
                "password": "user.password",
                "contact": "user.contact",
                "email": "user.email"
            },
            "tags": [
                "user", "account"
            ]
        }

        const eventBroker = require('../js/eventBrokerConnector')({
            brokerHost: '194.94.239.125', // use correct data
            brokerPort: '9000', // use correct data
            appName: 'test-app',
            appHost: 'localhost',
            appPort: '8080',
          })

          eventBroker.subscribe(
            'create-user',
            (event) => console.log("event subscribed") /* do something when this event occurs */
          )

          eventBroker.listen();
          
          eventBroker.request(
            'create-user',
            {
                apiData
            }
            )
            .then((res) => {
                console.log(res)/* continue after someone responed to your request event - will timeout if no response was given after 30 seconds */
            })
            .catch((err) => console.log(err) /* heal after request error */)
    }

    // constructor(firstName: string, lastName: string, username: string, password: string, contact: string, email: string){
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.username = username;
    //     this.password = password;
    //     this.contact = contact;
    //     this.email = email;

    //     this.Sign_up(firstName, lastName, username, password, contact, email);
    // }

    // Sign_up(firstName: string, lastName: string, username: string, password: string, contact: string, email: string){
    //     let user = new User(firstName, lastName, username, password, contact, email);

    //     var apiData = {
    //         "type": "create-user",
    //         "sender": "A-Team",
    //         "payload": {
    //             "username": user.username,
    //             "firstName": user.firstName,
    //             "lastName": user.lastName,
    //             "password": user.password,
    //             "contact": user.contact,
    //             "email": user.email
    //         },
    //         "tags": [
    //             "user", "account"
    //         ]
    //     }

    //     const eventBroker = require('./eventBrokerConnector')({
    //         brokerHost: '194.94.239.125', // use correct data
    //         brokerPort: '9000', // use correct data
    //         appName: 'test-app',
    //         appHost: 'localhost',
    //         appPort: '8080',
    //       })

    //       eventBroker.subscribe(
    //         'create-user',
    //         (event) => console.log("event subscribed") /* do something when this event occurs */
    //       )

    //       eventBroker.request(
    //         'create-user',
    //         {
    //             apiData
    //         }
    //         )
    //         .then((res) => {
    //             console.log(res)/* continue after someone responed to your request event - will timeout if no response was given after 30 seconds */
    //         })
    //         .catch((err) => console.log(err) /* heal after request error */)

    // }
}

let user = new User();