import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 2
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        return next();
    }catch(error){
        return next(error);
    }
});

const User =mongoose.model("UserBlog", userSchema);
export default User;