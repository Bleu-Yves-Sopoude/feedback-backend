const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true,"Please add the user name"],
        },
        phone_number: {
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


    },{
        timestamps:true,
    }
);

module.exports= mongoose.model("User",userSchema);