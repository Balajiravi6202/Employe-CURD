import mongoose from "mongoose";

const employe = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    


    },
    employeId:{
        type:String,
        required:true,
        unique:true
        

    },
    joiningDate:{
        type:Date,
        required:true

    },
    salary:{
        type:Number,
        required:true

    }


})

const emp = mongoose.model('employeData',employe);
export default emp;