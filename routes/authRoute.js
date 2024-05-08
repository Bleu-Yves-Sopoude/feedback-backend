const express = require("express");
const router = express.Router()
const{signUp, login} = require("../controllers/authController")



// router.get("/test", (req, res) => {
//     return res.json({message: "testing successful"})
// })

router.post("/signup", signUp)
router.post("/login", login)

module.exports = router;