const mongoose=require('mongoose')
require('dotenv').config()
const mongoURI=process.env.MongoDBURI

const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(mongoURI)
        console.log(`Connection Success ${connect.connection.name}`)
    } catch (error) {
       console.log(error) 
    }
}

module.exports=connectDB