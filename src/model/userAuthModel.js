const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        enum: {
            values: ['student', 'tutor', 'admin'],
            message: '[{VALUE}] is not supported. Supported values are - student | tutor | admin'
          }
    }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;