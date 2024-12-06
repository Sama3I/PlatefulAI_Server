const express = require('express');
const { PORT, CLIENTSECRET } = require('./config');
const expressApp = require('./express-app');
const databaseConnection = require('./database/connection')
const passport = require('passport');
const session = require('express-session');

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    require('./auth/passport');
    app.use(session({
        secret: CLIENTSECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer()