const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const detenv = require("dotenv").config();
const cors = require("cors")
const app = express();


// router directories
const authRouter = require("./routes/authRoute");



const cors = require('cors');


// Use CORS middleware
app.use(cors({
    origin:  'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));



connectDb();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
const port= process.env.PORT || 5000;
app.use(express.json());
app.use("/api/feedbacks", require("./routes/feebackRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)




//route middlewares
app.use("/auth", authRouter)






app.listen(port, ()=> {
    console.log(`Server running on port ${port}` );
}

)