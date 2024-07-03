const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./routes/Users');
const itemRoutes = require('./routes/Items')
const connectDB = require('./connectDB');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;



app.use(cookieParser());



app.use(cors({ credentials: true, origin: [HOST]}));
app.use(express.json());

app.use(userRoutes);
app.use(itemRoutes);
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/',(req,res)=>{
    res.send("working")
})


connectDB();

app.listen(PORT,()=>{
    console.log("server",PORT);
})