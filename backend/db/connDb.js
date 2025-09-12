const mongoose = require('mongoose');



const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected...');
      
        
    } catch (err) {
      
      console.error('Database connection error:', err);
        
    }

}
module.exports = {connectDb}; 