const { errorOptions, loginSchema, signupSchema } = require("../utils/utils");
const UserModel = require("../models/userSchema")
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");



const signUp = async(req, res) => {
    try {

        console.log(req.body)

        const { firstName, lastName, phone, email, role, password, confirmPassword } = req.body;

        
        const validateUser = signupSchema.validate(
            req.body, errorOptions
        )

        // console.log(validateUser);
        if (validateUser.error) {
            return res.status(401).json({ error: validateUser.error.details[0].message})
        }

        // const salt = bcrypt.genSaltSync(10);
        // console.log(salt)

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

         const existingEmail = await UserModel.findOne({
      email: email,
         });
        
        if (existingEmail) {
           return res
             .status(401)
             .json({ message: "conflict", error: "user Already exists" });
        }

        

         const newUser = await UserModel.create({
           firstName,
           lastName,
           email,
           phone,
           password: hashedPassword,
           role
         });

         res.status(201).json({
             message: "User created successfully",
             user: newUser
         });

        
    } catch (error) {

        console.error(error);
        res.status(500).json({
          message: "Internal server error",
          error: error.message,
        });
        
    }
}


const login = async(req, res) => {
    try {

        const { email, password } = req.body;
        
        const validateUser = loginSchema.validate(
            req.body, errorOptions
        )

        if (validateUser.error) {
            return res.status(401).json({ error: validateUser.error.details[0].message})
        }

        const user = await UserModel.findOne({
            email: email
        })

        if (!user) {
            return res.status(401).json({error: "Invalid Email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }

         // grant user a token
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = Number(process.env.JWT_EXPIRES_IN) * 3600;

    const jwtPayload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(jwtPayload, secretKey, { expiresIn });

    // attach the token to the headers; save in cookies
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, { maxAge: expiresIn * 1000, httpOnly: true });

        return res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                first: user.firstName,
                last: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
            },
            token,
        })
        
    } catch (error) {
        console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    }
}

module.exports = {
  signUp, login,
};