const asyncHandler = require('express-async-handler')
const Feedback = require("../models/feedbackModel");
//@desc Get all feedbacks
//@route Get /api/feedbacks
//@acces private

const getFeedbacks = asyncHandler( async(req, res)=>{
    const feedbacks = await Feedback.find({ user_id: req.user.id});
    res.status(200).json(feedbacks);
});

//@desc Create feedback
//@route POST /api/feedback/
//@acces private

const createFeedback =asyncHandler( async(req, res)=>{
    console.log("The request body is :",req.body)
    const {rating, comment} =req.body;
    if (!rating || !comment ){
        res.status(400);
        throw new Error("All fileds are mandatory !");
    }
    const feedback = await Feedback.create({
        rating,
        comment,
        user_id: req.user.id
    });

    res.status(201).json(feedback);
});

//@desc  get a feedback
//@route PUT /api/feedback/:id
//@acces private

const getFeedback = asyncHandler(async(req, res)=> {
    const feedback = await Feedback.findById(req.params.id);
    if(!feedback){
        res.status(404);
        throw new Error("Feedback not found");
    }
    res.status(200).json(feedback);
});




//@desc Update feedback
//@route PUT /api/feedback/:id
//@acces private

const updateFeedback = asyncHandler( async(req, res)=>{
    const feedback = await Feedback.findById(req.params.id);
    if(!feedback){
        res.status(404);
        throw new Error("Feedback not found");
    }
    if(feedback.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User doesnt have permission to update other user feedbacks");
    }
    const updatedFeeback = await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );
    res.status(200).json(updatedFeeback);
});

//@desc DELETE feedback
//@route DELETE /api/feedback/:id
//@acces public
const deleteFeedback = asyncHandler( async(req, res)=>{
    const feedback = await Feedback.findById(req.params.id);
    if(!feedback){
        res.status(404);
        throw new Error("Feedback not found");
    }
    if(feedback.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User doesnt have permission to delete other user feedbacks");
    }
    await feedback.deleteOne({_id: req.params.id});
    res.status(200).json({message:`Delete feedback for ${req.params.id}`});
});


module.exports = {getFeedbacks, getFeedback ,createFeedback, getFeedbacks, deleteFeedback, updateFeedback}