const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Welcome to the API which does everything!')
})

app.post('/create-user', (request, response) => {
  first_name = request.headers["firstName"]
  last_name = request.headers["lastName"]
  user_name = request.headers["userName"]
  response.send('User Created Successfully!')
})

app.post('/send-message', (request, response) => {
  user_name_from = request.headers["userNameFrom"]
  user_name_to = request.headers["userNameTo"]
  message = request.headers["message"]
  console.log(request.headers)
  response.send(message)

})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
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
