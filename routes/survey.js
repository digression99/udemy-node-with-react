const mongoose = require('mongoose');

const router = require('express').Router();
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('survey');
const surveyTemplate = require('../services/email-templates/surveyTemplate');

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log('received data : ', req.body);

    try {
        const survey = new Survey({
            title,
            body,
            subject,
            recipients : recipients.split(',').map(email => ({ email : email.trim() }) ),
            _user : req.user.id
        });

        // send email.
        const mailer = new Mailer(survey, surveyTemplate(survey));

        await mailer.send();
        await survey.save();
        req.user.credits -= 1;

        const user = await req.user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(422).send(e);
    }
});

router.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback!');
});

module.exports = router;