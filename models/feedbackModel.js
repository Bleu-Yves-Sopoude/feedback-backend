const { timestamps } = require("mongodb")
const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema(
    {


    rating: {
        type: String,
        required: [true, "Please add the rating"],
    },

    comment: {
        type: String,
        required: [true, "Please add the comment"],
    },

    },
    {
        timestamps:true,
    }


);
module.exports =mongoose.model("Feedback",feedbackSchema)