require("dotenv").config({path:"./config/config.env"})
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const auth=require("./middlewares/auth");
const connectDB=require("./config/db");

//midlleware
app.use(express.json());
app.use(morgan("tiny")); // it gives a end point in it
app.use(require("cors")())

//routes
app.use("/api",require("./routes/auth"));
app.use("/api",require("./routes/contact"))


app.get("/protected",auth,(req,res)=>{
   // return res.status(200).json({user:req.user});
   return res.status(200).json({...req.user._doc});

})

//server configurestions.
const PORT = process.env.PORT || 8000;

app.listen(PORT, async() => {
     //we don't want to app to excuted untill  your app successfull connected your database
     try{
     await connectDB();
    console.log(`server listing on port :${PORT}`);
     }catch(err){
        console.log(err)
     }
});
