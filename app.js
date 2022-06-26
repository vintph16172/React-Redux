// Bước 1: include thư viện http
import express from 'express';
import mongoose from 'mongoose';

import productRoute from "./routes/products"
import categoryRoute from './routes/category'
import { checkAuth } from './middlewares/checkAuth';
import authRouter from './routes/auth';
import cors from 'cors'
import cartRoute from './routes/cart';
import detailCartRoute from './routes/detailCart';
import couponRoute from './routes/coupon'
import commentRoute from './routes/comment'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'

const app = express();

dotenv.config()
// const homeRoute = require('./routes/home');


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.all('/', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()  
// });

app.use("/api", checkAuth, productRoute);
app.use("/api", categoryRoute)
app.use("/api", authRouter)
app.use("/api",cartRoute)
app.use("/api",detailCartRoute)
app.use("/api",couponRoute)
app.use("/api",commentRoute)


mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Bước 3: lắng nghe cổng thực thi


app.use(express.static(path.join(__dirname, "./cliend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./cliend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Server is running on port 8000");
});