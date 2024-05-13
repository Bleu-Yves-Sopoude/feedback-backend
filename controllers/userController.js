const asyncHandler = require("express-async-handler")
const bcrypt =require("bcrypt");
const User =require("../models/userModel");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route post /api/users/feedbacks
//@acces public

const registerUser = asyncHandler(async (req, res) => {
    const {firstName,lastName,phone, role, email, password} =req.body;
    if( !firstName || !lastName ||  !phone || !email || !password  || !role){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash paaword
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const user = await User.create({
        firstName,
        lastName,
        phone,
        role,
        email,
        password:hashedPassword,
    });

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    } else{
        res.status(400);
        throw new Error("User data not valid");
    }
    res.json({mesaage:"Register the user"});




} );



//@desc login a user
//@route post /api/users/login
//@acces public

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} =req.body;

    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}

        );
        res.status(200).json({accessToken});

    } else{
        res.status(401);
        throw new Error("email or password is not valid");
    }

});


//@desc current  user
//@route get /api/users/current
//@acces private

const currentUser = asyncHandler((req, res) =>{

    res.json(req.user);
});

module.exports ={loginUser, registerUser, currentUser};
