const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const {
    PORT,
    NODE_ENV
} = process.env;

if (NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

// client id, client secret is in .env.
passport.use(new GoogleStrategy());


// app.get('/', (req, res) => {
//     res.send({hli : 'there'});
// });

console.log('node env is : ', NODE_ENV);

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});