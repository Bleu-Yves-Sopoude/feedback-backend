const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const detenv = require("dotenv").config();
const cors = require("cors")
const app = express();


// router directories
const authRouter = require("./routes/authRoute");



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
app.use(errorHandler)




//route middlewares
app.use("/auth", authRouter)






app.listen(port, ()=> {
    console.log(`Server running on port ${port}` );
}

)