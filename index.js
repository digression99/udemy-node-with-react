const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('./services/passport');

const {
    PORT
} = process.env;

const app = express();
app.use(require('./routes/auth'));

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});