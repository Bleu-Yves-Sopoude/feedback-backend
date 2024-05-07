const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const detenv = require("dotenv").config();
const app= express();

connectDb();
const port= process.env.PORT || 5000;
app.use(express.json());
app.use("/api/feedbacks", require("./routes/feebackRoutes"));
app.use(errorHandler)




app.listen(port, ()=> {
    console.log(`Server running on port ${port}` );
}

)