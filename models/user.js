const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID : {
        type : String
    },
    credits : {
        type : Number,
        default : 0
    },
    googlePhotoURL : {
        type : String,
        default : null,
        required : false
    }
});

// userSchema.pre('save', async function (next) {
//     const User = this;
//
//     try {
//
//     } catch (e) {
//         const res = await User.findOne({
//             googleID : user.googleID
//         });
//     }
// });

module.exports = mongoose.model('user', userSchema);