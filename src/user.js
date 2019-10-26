class User{


    constructor(username, firstName, lastName){//, eventBroker){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        //this.eventBroker = event.Broker;
        this.eventBroker = require('../js/eventBrokerConnector')({
            brokerHost: '194.94.239.125',
            brokerPort: '9000',
            appName: 'test-app',
            appHost: '192.168.137.1',
            appPort: '8080'
       });
       this.app = this.eventBroker.app;
       this.create_user();
    }
    

    create_user(){
        // eventBroker.subscribe('create-user', (event, topic) => console.log(event) /* do something when this event occurs */
        // )
        this.eventBroker.listen();
       
        this.eventBroker.request('create-user', {
                "username": this.username,
                "firstName": this.firstName,
                "lastName": this.lastName
        }
        ).then((res)=>{
            console.log(res);
        }).catch((err)=>console.log(err))
    }

}
var user = new User("jacki", "jack","huels");