const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
const User = require('../models/user');

const {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET
} = process.env;

passport.use(new GoogleStrategy({
    clientID : OAUTH_CLIENT_ID,
    clientSecret:OAUTH_CLIENT_SECRET,
    callbackURL : `/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    // callback function.
    // console.log('access token : ', accessToken);
    // console.log('refresh token : ', refreshToken);
    // console.log('profile : ');
    // console.log(JSON.stringify(profile, null, 2));

    const googleID = profile.id;
    const name = profile.name.givenName + profile.name.familyName;
    const email = profile.emails[0].value;
    const photoURL = profile.photos[0].value;

    console.log('id : ', googleID);
    console.log('name : ', name);
    console.log('email : ', email);
    console.log('photo URL : ', photoURL);

    // check if the user already exists.

    try {
        const existingUser = await User.findOne({googleID});
        if (existingUser) throw new Error('user already exists.');

        const user = new User({
            googleID
        });
        await user.save();
    } catch (e) {
        console.log(e);
    }
    done();
}));