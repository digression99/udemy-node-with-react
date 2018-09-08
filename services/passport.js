const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const Survey = require('../models/survey');

const {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET
} = process.env;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);

        done(null, user);
    } catch (e) {
        done(e);
    }
});

passport.use(new GoogleStrategy({
    clientID : OAUTH_CLIENT_ID,
    clientSecret:OAUTH_CLIENT_SECRET,
    callbackURL : `/auth/google/callback`,
    proxy : true
}, async (accessToken, refreshToken, profile, done) => {
    const googleID = profile.id;
    const name = profile.name.givenName + profile.name.familyName;
    const email = profile.emails[0].value;
    const googlePhotoURL = profile.photos[0].value;

    console.log('id : ', googleID);
    console.log('name : ', name);
    console.log('email : ', email);
    console.log('photo URL : ', googlePhotoURL);

    try {
        const existingUser = await User.findOne({
            googleID
        });
        if (existingUser) {
            if (!existingUser.googlePhotoURL) {
                existingUser.googlePhotoURL = googlePhotoURL;
                const newUser = await existingUser.save();
                return done(null, newUser);
            } else {
                return done(null, existingUser);
            }
        }
        const user = new User({
            googleID,
            googlePhotoURL
        });
        await user.save();
        done(null, user);
    } catch (e) {
        console.log(e);
        done(e);
    }
    done();
}));