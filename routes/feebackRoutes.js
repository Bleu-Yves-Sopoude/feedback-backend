const express =require("express");
const {getFeedbacks, getFeedback, createFeedback, updateFeedback, deleteFeedback } = require("../controllers/feebackController");
const router = express.Router();

router.route("/").get(getFeedbacks).post(createFeedback);

router.route("/:id").put(updateFeedback).get(getFeedback).delete(deleteFeedback);

module.exports = router;