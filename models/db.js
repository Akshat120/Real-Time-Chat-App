const data = require('./data')
const jwt = require('jsonwebtoken');

exports.check_username_and_password = (form_user) => {
    return new Promise((resolve,reject)=>{

        data.users.forEach(user => {
            if(user.username === form_user.username && user.password === form_user.password) {
                return resolve(user)
            }
        });
    
        return reject("User Not Found!")

    })
}