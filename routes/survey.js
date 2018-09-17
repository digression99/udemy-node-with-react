const mongoose = require('mongoose');
const Path = require('path-parser').default;
const { URL } = require('url');
const router = require('express').Router();
const _ = require('lodash');

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

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!');
});

router.post('/api/surveys/webhook', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
        .map(({ url, email, event }) => {
        if (event === 'click') {
            const match = p.test(new URL(url).pathname); // if not matched, null.
            if (match) return { ...match, email }
        }
    })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne({ // don't have to wait.
                _id : surveyId,
                recipients : {
                    $elemMatch : { email : email, responded : false }
                }
            }, {
                $inc : { [choice] : 1 },
                $set : { 'recipients.$.responded' : true },
                lastResponded : new Date()
            }).exec();
        })
        .value();

    res.send({});
});

router.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey
        .find({ _user: req.user.id })
        .select({ recipients : false });
    res.send(surveys);
});

module.exports = router;