const passport = require('passport');
const router = require('express').Router();

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
}), (req, res) => {
    res.send('google oauth completed');
});

module.exports = router;
