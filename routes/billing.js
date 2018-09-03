const router = require('express').Router();
const requireLogin = require('../middlewares/requireLogin');

const {
    STRIPE_SECRET_KEY
} = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

router.post('/api/stripe', requireLogin, async (req, res) => {
    const tokenId = req.body.id;

    const charge = await stripe.charges.create({
        amount : 500,
        currency : 'usd',
        description : '$5 for 5 email credits.',
        source : tokenId
    });

    req.user.credits += 5; // user is automatically added.
    const user = await req.user.save();

    res.send(user);
});

module.exports = router;
