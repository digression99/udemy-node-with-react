const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET
} = process.env;

passport.use(new GoogleStrategy({
    clientID : OAUTH_CLIENT_ID,
    clientSecret:OAUTH_CLIENT_SECRET,
    callbackURL : `/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
    // callback function.
    console.log('access token : ', accessToken);
    console.log('refresh token : ', refreshToken);
    console.log('profile : ');
    console.log(JSON.stringify(profile, null, 2));
    done();
}));