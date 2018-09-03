
require('./config');

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const {
    PORT,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_URI,
    COOKIE_KEY,
    NODE_ENV
} = process.env;

// db connection.
mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URI}`);

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    maxAge : 30 * 24 * 60 * 60* 1000,
    keys : [COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/auth'));
app.use(require('./routes/billing'));

require('./services/passport');

if (NODE_ENV === 'production') {
    // express will serve up production assets
    // like main.js file or main.css file.
    app.use(express.static('../../client/build'));

    // express will serve up the index.html file
    // if it doesn't recognize the route.
    app.get('*', (req, res) => {
        console.log('this is global router.');
        console.log(path.join(__dirname, '../'));
        console.log(path.join(__dirname, '../..'));
        console.log(path.join(__dirname, '../../..'));
        console.log(path.join(__dirname, '../../../..'));
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
        // res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});


