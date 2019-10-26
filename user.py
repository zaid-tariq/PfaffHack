import requests
json_var = {
    type: 'create-user',
    sender: 'admin',
    payload: {
        username: 'khashmi',
        firstName: 'khurram',
        lastName: 'Hashmi'
    },
    tags: [
        'user', 'account'
    ]
}
r = requests.post('http://194.94.239.125:9000/publish', json=json_var)
print(r.content)
