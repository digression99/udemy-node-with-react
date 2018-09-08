const sendgrid = require('sendgrid');
const { mail : helper } = sendgrid;
const {
    SENDGRID_API_KEY
} = process.env;

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(SENDGRID_API_KEY);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body); // helper.Mail built-in function.
        this.addClickTracking();

        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);

        this.addTrackingSettings(trackingSettings); // helper.Mail built-in function.
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.map(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize); // helper.Mail built-in function.
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method : 'POST',
            path : '/v3/mail/send',
            body : this.toJSON()
        });

        return await this.sgApi.API(request);
    }
}

module.exports = Mailer;
