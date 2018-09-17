
const {
    SENDGRID_REDIRECT_DOMAIN
} = process.env;


module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style="text-align : center;">
                <p>Hello there.</p>
                <h3>I'd like your input.</h3>
                <p>Please, answer the following question : </p>
                <p>${survey.body}</p>
                <div>
                    <a href="${SENDGRID_REDIRECT_DOMAIN}/api/surveys/${survey.id}/yes">YES</a>
                    <a href="${SENDGRID_REDIRECT_DOMAIN}/api/surveys/${survey.id}/no">NO</a>
                </div> 
            </div>
        </body>
    </html>
    `;
};
