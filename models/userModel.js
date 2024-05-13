const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true,"Please add the user name"],
        },
        lastName: {
            type: String,
            required: [true,"Please add the user name"],
        },
        phone: {
            type: String,
            required: [true,"Please add the user name"],
        },
        email:{
            type: String,
            required: [true, "Please add the user email address"],
            unique:[true,"Email address already taken"],
        },
        password:{
            type: String,
            required:[true, "Please add the use password"],
        },
        role: {
            type: String,
            required: [true,"Please add the user name"],
        },


    },{
        timestamps:true,
    }
);

module.exports= mongoose.model("User",userSchema);