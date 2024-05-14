const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const detenv = require("dotenv").config();
const app= express();

const cors = require('cors');


// Use CORS middleware
app.use(cors({
    origin:  'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));



connectDb();
const port= process.env.PORT || 5000;
app.use(express.json());
app.use("/api/feedbacks", require("./routes/feebackRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)




app.listen(port, ()=> {
    console.log(`Server running on port ${port}` );
}

)