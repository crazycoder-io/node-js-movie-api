"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, '`{PATH}` field is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    }
});
module.exports = mongoose.model('users', UserSchema);