const passport = require('passport');
const router = require('express').Router();

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
}), (req, res) => {
    res.send('google oauth completed');
});

router.get('/api/current-user', (req, res) => {
    res.send(req.user);
});

router.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

module.exports = router;
