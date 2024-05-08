const asyncHandler = require("express-async-handler")



//@desc Register a user
//@route post /api/users/feedbacks
//@acces public

const registerUser = asyncHandler( (req, res) =>{

    res.json({ message:"Register the user"});
} );



//@desc login a user
//@route post /api/users/login
//@acces public

const loginUser = asyncHandler((req, res) =>{

    res.json({ message:"login user"});
});


//@desc current  user
//@route get /api/users/current
//@private public

const currentUser = asyncHandler((req, res) =>{

    res.json({ message:"Current user info"});
});

module.exports ={loginUser, registerUser, currentUser};
