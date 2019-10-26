class User{

    create_user(username, firstName, lastName, eventBroker){
        // eventBroker.subscribe('create-user', (event, topic) => console.log(event) /* do something when event occurs */
        // )
        // eventBroker.listen();
       
        eventBroker.request('create-user', {
                "username": username,
                "firstName": firstName,
                "lastName": lastName
        }
        ).then((res)=>{
            console.log(res);
        }).catch((err)=>console.log(err))
    }

}
// var user = new User("jacki", "jack","huels");