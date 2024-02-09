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

exports.message = [
    {
        "id": 1,
        "user1" : 1,
        "user2": 2,
        "messages" : [
            {
                "from":1,
                "to":2,
                "data": "Hi, I'm John. How are you Smith?",
                "sent_at": new Date(2024, 0, 1, 10, 30, 0)
            },
            {
                "from":2,
                "to":1,
                "data": "Hi, I'm fine. How are you John?",
                "sent_at": new Date(2024, 0, 1, 10, 30, 20)
            },
            {
                "from":1,
                "to":2,
                "data": "Hi, I'm also fine.",
                "sent_at": new Date(2024, 0, 1, 10, 30, 30)
            }
        ]
    },
    {
        "id": 2,
        "user1" : 3,
        "user2": 4,
        "messages" : [
            {
                "from":3,
                "to":4,
                "data": "Hi, I'm Ankit. How are you Akshat?",
                "sent_at": new Date(2024, 0, 1, 10, 30, 0)
            },
            {
                "from":4,
                "to":3,
                "data": "Hi, I'm fine. How are you Ankit?",
                "sent_at": new Date(2024, 0, 1, 10, 30, 20)
            },
            {
                "from":3,
                "to":4,
                "data": "Hi, I'm also fine.",
                "sent_at": new Date(2024, 0, 1, 10, 30, 30)
            }
        ]
    }
]