
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const {
    PORT,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_URI,
    COOKIE_KEY
} = process.env;

// db connection.
mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URI}`);

const app = express();

app.use(cookieSession({
    maxAge : 30 * 24 * 60 * 60* 1000,
    keys : [COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/auth'));
// app.use(passport.initialize());
// app.use(passport.session());

require('./services/passport');

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});
