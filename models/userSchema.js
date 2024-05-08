
const { required } = require("joi");
const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },

})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;