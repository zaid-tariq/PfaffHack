const eventBroker = require('./eventBrokerConnector')({
  brokerHost: 'localhost', // use correct data
  brokerPort: '9000', // use correct data
  appName: 'your-app-name',
  appHost: 'your ip',
  appPort: 'any port',
})

// an express app with json body parser, you may pass your own express instance instead as second argument to the init function
const app = eventBroker.app

// you have to call listen once your setup is finished
// only then you will receive notifications upon events you subscribed to
eventBroker.listen()

eventBroker.subscribe(
  '<topic name>',
  (event) => null /* do something when this event occurs */
)

eventBroker.unsubscribe('<topic name>')

eventBroker
  .publish(
    '<topic name>',
    {
      /* event payload */
    },
    ['<tag1>', '<tag2>', '<tag3>'], // tags
    ['userId'], // concerned users
    '..' // id of event you are respsonding to
  )
  .then((res) => {
    /* continue after publish successful */
  })
  .catch((err) => null /* heal after publish error */)

eventBroker
  .request(
    '<topic name>',
    {
      /* event payload */
    },
    ['<tag1>', '<tag2>', '<tag3>'], // tags
    ['userId'], // concerned users
    '..' // id of event you are respsonding to
  )
  .then((res) => {
    /* continue after someone responed to your request event - will timeout if no response was given after 30 seconds */
  })
  .catch((err) => null /* heal after request error */)
