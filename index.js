const express = require('express');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('./services/passport');

const {
    PORT,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_URI
} = process.env;

// db connection.
mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URI}`);

const app = express();
app.use(require('./routes/auth'));

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});