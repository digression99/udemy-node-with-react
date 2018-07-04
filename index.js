const express = require('express');

const {
    PORT,
    NODE_ENV
} = process.env;

if (NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.get('/', (req, res) => {
    res.send({hli : 'there'});
});

app.listen(PORT || 5000, () => {
    console.log('listening on port : ', PORT || 5000);
});