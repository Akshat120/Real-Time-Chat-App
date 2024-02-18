// Basic authentication middleware
const basicAuth = require('express-basic-auth');

// Custom authentication function
const myAuthorizer = (username, password) => {
    const userMatches = basicAuth.safeCompare(username, process.env.SITE_USERNAME);
    const passwordMatches = basicAuth.safeCompare(password, process.env.SITE_PASSWORD);

    return userMatches & passwordMatches;
}

exports.useBasicAuth = (app)=>{
    app.use(basicAuth({
        authorizer: myAuthorizer,
        challenge: true,
        realm: 'My Application',
    }))
}

