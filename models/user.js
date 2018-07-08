const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleID : {
        type : String
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