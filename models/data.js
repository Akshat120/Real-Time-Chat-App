exports.users = [
    {
        "id":1,
        "username":"john",
        "password":"jn123"
    },
    {
        "id":2,
        "username":"smith",
        "password":"sh123"
    },
    {
        "id":3,
        "username":"ankit",
        "password":"ak123"
    },
    {
        "id":4,
        "username":"akshat",
        "password":"ak123"
    }
]

exports.friends_relation = [
    {
        "id": 1,
        "userId" : 1,
        "friends" : new Map([
            [2,true],
            [3,true],
            [4,true]
        ])
    },
    {
        "id": 2,
        "userId" : 2,
        "friends" : new Map([
            [1,true],
            [3,true],
            [4,true]
        ])
    },
    {
        "id": 3,
        "userId" : 3,
        "friends" : new Map([
            [1,true],
            [2,true],
            [4,true]
        ])
    },
    {
        "id": 4,
        "userId" : 4,
        "friends" : new Map([
            [1,true],
            [2,true],
            [3,true]
        ])
    }
]
