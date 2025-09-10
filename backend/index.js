const express=require('express');
const {connectDb}=require('./db/connDb');

const cors = require('cors');

const cookieParser=require('cookie-parser');
require('dotenv').config();
const authRoutes=require('./routes/authRoute');



const app=express();
const port=process.env.PORT
 connectDb();




app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: (origin, callback) => callback(null, origin), 
  credentials: true
}));

app.use('/api/auth',authRoutes);



  

app.listen(port,()=>{
    console.log(`listening on ${port}`);
   
})