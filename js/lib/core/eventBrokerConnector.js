/**
 * The eventBrokerConnector serves as an easy to use interface for the
 * communication with the event broker.
 *
 *
 * //TODO
 * - unsubscribe
 *
 */

const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')

const postToEventBroker = (url, body) => axios.post(url, body)
// {
//new Promise((resolve, reject) => {

//.then((res) => {
//  resolve(res.data)
//})
//}//)
//}

const publish = (type, payload, tags, concernedUsers, causedBy, url, appName) =>
  postToEventBroker(`${url}/publish`, {
    type,
    sender: appName,
    concernedUsers,
    causedBy,
    payload,
    tags,
  })
    .then((res) => res.data)
    .catch((err) => new Error(`Unable to publish: ${err}`))

const request = (type, payload, tags, concernedUsers, causedBy, url, appName) =>
  postToEventBroker(`${url}/request`, {
    type,
    sender: appName,
    concernedUsers,
    causedBy,
    payload,
    tags,
  })
  .then((res) => res.data)
  .catch((err) => new Error(`Unable to request: ${err}`))

const subscribe = (topic, url, appName, address, id, onSubscriberId) =>
  postToEventBroker(`${url}/subscribe`, {
    sender: appName,
    address,
    interestedIn: topic,
  })
    .then((res) => res.data)
    .catch((err) => new Error(`Unable to unsubscribe: ${err}`))

const unsubscribe = (topic, url, appName, address) =>
  postToEventBroker(`${url}/unsubscribe`, {
    sender: appName,
    address,
    interestedIn: topic,
  })
      .then((res) => res.data)
    .catch((err) => new Error(`Unable to unsubscribe: ${err}`))

const init = (
  { brokerHost, brokerPort, appHost, appPort, appName },
  expressApp
) => {
  const eventBroker = `http://${brokerHost
    .replace('http:', '')
    .replace('/', '')}:${brokerPort}`

  const appAddress = `http://${appHost
    .replace('http:', '')
    .replace('/', '')}:${appPort}/event-receiver`

  const topicHandlers = {}
  let subscriberId

  const app = expressApp || express()
  app.use(bodyParser.json({
    extended: true
}))

  app.post('/event-receiver', (req, res, next) => {
    const { topic, event } = req.body
    const handlerFn = topicHandlers[topic]
    if (handlerFn) {
      handlerFn(event, topic)
    }
    res.sendStatus(200)
  })

  console.info(
    `Event Broker Connector will listen for POST ${appAddress}, do not use this route in your service. `
  )

  return {
    // give access to express app object
    app,
    // give accesss to app listen function
    listen: () => app.listen(appPort),
    // event broker API
    publish: (type, payload, tags = [], concernedUsers = [], causedBy = null) =>
      publish(
        type,
        payload,
        tags,
        concernedUsers,
        causedBy,
        eventBroker,
        appName
      ),
    request: (type, payload, tags = [], concernedUsers = [], causedBy = null) =>
      request(
        type,
        payload,
        tags,
        concernedUsers,
        causedBy,
        eventBroker,
        appName
      ),
    subscribe: (topic, handlerFn) => {
      topicHandlers[topic] = handlerFn
      return subscribe(topic, eventBroker, appName, appAddress)
    },
    unsubscribe: (topic) => {
      topicHandlers[topic] = undefined
      return unsubscribe(topic, eventBroker, appName, appAddress)
    },
  }
}
module.exports = init
