var User = /** @class */ (function () {
    function User() {
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
        };
        var eventBroker = require('../js/eventBrokerConnector')({
            brokerHost: '194.94.239.125',
            brokerPort: '9000',
            appName: 'test-app',
            appHost: 'localhost',
            appPort: '8080'
        });
        eventBroker.subscribe('create-user', function (event) { return console.log("event subscribed"); } /* do something when this event occurs */);
        eventBroker.listen();
        eventBroker.request('create-user', {
            apiData: apiData
        })
            .then(function (res) {
            console.log(res); /* continue after someone responed to your request event - will timeout if no response was given after 30 seconds */
        })["catch"](function (err) { return console.log(err); } /* heal after request error */);
    }
    return User;
}());
var user = new User();
