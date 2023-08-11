const express=require('express');
const cors=require('cors');
const app=express();
const cookieParser=require("cookie-parser")
const errorMiddleware=require("./middleware/error")
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const path = require("path");
// const dotenv=require("dotenv");
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors())
// app.use(express.json({limit: '25mb'}));
// app.use(express.urlencoded({limit: '25mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  }));
  app.use(bodyParser.json({limit: "50mb"}));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//route import

const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
const order=require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order)
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

///middleware for error
app.use(errorMiddleware);
module.exports=app; 