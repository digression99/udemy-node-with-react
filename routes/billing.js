const router = require('express').Router();

router.post('/api/stripe', (req, res) => {
    const token = req.body;
    console.log('token got : ', token);
    res.redirect('/');
});

module.exports = router;
