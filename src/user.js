var User = /** @class */ (function () {
    function User(firstName, lastName, username, password, contact, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.contact = contact;
        this.email = email;
    }
    User.prototype.Sign_up = function (firstName, lastName, username, password, contact, email) {
        var user = new User(firstName, lastName, username, password, contact, email);
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
        };
        $.ajax({
            type: "POST",
            url: "http://194.94.239.125:9000/publish",
            data: apiData,
            success: function (responseJson) {
                console.info(responseJson);
            }
        });
    };
    return User;
}());
