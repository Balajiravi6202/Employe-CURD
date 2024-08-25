import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectdb = mongoose.connect(process.env.URL,{
 useNewUrlParser: true,
 useUnifiedTopology: true,
 
})

export default connectdb;