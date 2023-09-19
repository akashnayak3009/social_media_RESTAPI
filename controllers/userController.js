import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (error) {
        console.log("ERROR:" + error);
    }

    if (!users) {
        return res.status(404).json({ message: "No user Found" });
    }

    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exist! Login for this." });
        }

        const user = new User({
            name,
            email,
            password,
            blogs:[]
        });
        await user.save();

        return res.status(201).json({user});
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res, next) =>{
    const { email, password} = req.body;
    let existingUser;
    try{
         existingUser = await User.findOne({ email});

        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid= await bcrypt.compare(password, existingUser.password);
        if(isPasswordValid){
            return res.status(200).json({message:" Login successful"})
        }else{
            return res.status(401).json({message: "Invalid password"})
        }
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({message: "Internal Server Error"})
    }
};
