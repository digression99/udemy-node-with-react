const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./recipient');

const surveySchema = new Schema({
    title : {
        type: String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    recipients : {
        type : [RecipientSchema],
        required : true
    },
    yes : {
        type : Number,
        default : 0
    },
    no : {
        type : Number,
        default : 0
    },
    _user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    dateSent : {
        type : Date,
        default : Date.now()
    },
    lastResponded : {
        type : Date,
    }
});

module.exports = mongoose.model('survey', surveySchema);