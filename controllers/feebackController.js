const asyncHandler = require('express-async-handler')

//@desc Get all feedbacks
//@route Get /api/feedbacks
//@acces public

const getFeedbacks = asyncHandler( async(req, res)=>{
    res.status(200).json({message:"Get all feedbacks"});
});

//@desc Create feedback
//@route POST /api/feedback/
//@acces public

const createFeedback =asyncHandler( async(req, res)=>{
    console.log("The request body is :",req.body)
    const {name, email, pwd} =req.body;
    if (!name || !email || !pwd){
        res.status(400);
        throw new Error("All fileds are mandatory !");
    }
    res.status(201).json({message:"Create feedback"});
});

//@desc  get a feedback
//@route PUT /api/contact/:id
//@acces public

const getFeedback = asyncHandler((req, res)=>{
    res.status(200).json({message:`get feedback for ${req.params.id}`});
});




//@desc Update feedback
//@route PUT /api/feedback/:id
//@acces public

const updateFeedback = asyncHandler( async(req, res)=>{
    res.status(200).json({message:`Update feedback for ${req.params.id}`});
});

//@desc DELETE feedback
//@route DELETE /api/feedback/:id
//@acces public
const deleteFeedback = asyncHandler( async(req, res)=>{
    res.status(200).json({message:`Delete feedback for ${req.params.id}`});
});


module.exports = {getFeedback ,createFeedback, getFeedbacks, deleteFeedback, updateFeedback}