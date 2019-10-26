const express = require('express')
const app = express()
const port = 3000


const eventBroker = require('./eventBrokerConnector')({
  brokerHost: '194.94.239.125', // use correct data
  brokerPort: '9000', // use correct data
  appName: 'Smart Commute',
  appHost: '194.94.239.22',
  appPort: '8884',
})

eventBroker.listen()


const store = require("./storage")
const new_store = new store()

app.get('/create-user', (request, response) => {
  first_name = request.headers["firstname"]
  last_name = request.headers["lastname"]
  user_name = request.headers["username"]
  user_info = {
    "username": user_name,
    "firstname": first_name,
    "lastname": last_name
  }
  
  // var instance = require('./user.js');
  // instance.create_user(user_name,first_name,last_name,eventBroker);
  eventBroker.request('create-user', {
    "username": user_name,
    "firstname": first_name,
    "lastname": last_name
    }
    ).then((res)=>{
        console.log(res);
    }).catch((err)=>console.log(err)) 

  new_store.store_information(eventBroker,user_info)  

  success_ = {
    "statusText":"KHURRAM",
    "status":"200"
  }

  response.send(success_);
})

app.post('/send-message', (request, response) => {
  user_name_from = request.headers["usernamefrom"]
  user_name_to = request.headers["usernameto"]
  message = request.headers["message"]

  const chat = require("./chat")
  const new_chat = new chat()
  
  new_chat.send_message(user_name_from, user_name_to, message, eventBroker)

  response.send(message)
})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})


app.get('/get-user', (request, response) => {
  console.log(request.headers)
  user_info = {
    "username": request.headers["username"]
  }
  user_info = new_store.get_information(eventBroker,user_info,1)  
  response.send(user_info);
})





















// const eventBroker = require('./eventBrokerConnector')({
//   brokerHost: '194.94.239.125', // use correct data
//   brokerPort: '9000', // use correct data
//   appName: 'Smart Commute',
//   appHost: '194.94.239.22',
//   appPort: '8884',
// })

// // an express app with json body parser, you may pass your own express instance instead as second argument to the init function
// const app = eventBroker.app

// // you have to call listen once your setup is finished
// // only then you will receive notifications upon events you subscribed to
// eventBroker.listen()

// eventBroker.subscribe('created-user',(event, topic) => console.log(event) /* do something when this event occurs */
// )
// // eventBroker.unsubscribe('create-user')
// console.log("Started listening")
// var json = {
//   "type": "create-user",
//     "sender": "pm-user",
//     "payload": {
//         "username": "khashmi",
//         "firstName": "khurram",
//         "lastName": "hashmi"
//     },
//     "tags": [
//         "user", "account"
//     ]
// }
// eventBroker.request(
//     'create-user',
//     {
//       "username": "khashmi",
//       "firstName": "khurram",
//       "lastName": "hashmi"
//     },
//     //["user-anlegen"] // tags
//     // ['userId'], // concerned users
//     // '..' // id of event you are respsonding to
//   )
//   .then((res) => {
//     console.log(res)
//     /* continue after publish successful */
//   })
//   .catch((err) => console.log("adsasd") /* heal after publish error */)

// eventBroker.request(json)
//   .then((res) => {
//     console.log(res)
//      //continue after someone responed to your request event - will timeout if no response was given after 30 seconds 
//   })
//   .catch((err) => null /* heal after request error */)
