const express = require('express');
require('dotenv').config();

const {
    PORT
} = process.env;

const app = express();

app.get('/', (req, res) => {
    res.send({hi : 'there'});
});

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});