import Blogs from "../model/blogModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    try {
        let blogs = await Blogs.find();

        if (!blogs) {
            return res.status(401).json({ message: "No blog found" });
        }
        return res.status(200).json({ blogs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const addBlog = async(req,res,next)=>{
  try{
    const { title, description, image, user} =req.body;

    let existingUser = await User.findById(user);

    if(!existingUser){
        return res.status(400).json({message:"unable to find user by this id"})
    }
    const blog = new Blogs({
        title,
        description,
        image,
        user
      })
      const session  = await mongoose.startSession();
      session.startTransaction();
      await blog.save({session});
      existingUser.blogs.push(blog);
      await existingUser.save({session})
      return res.status(200).json({blog}); 
      await session.commitTransaction(); 
  }catch(error){
    console.log(error);
    return res.status(404).json({message:"Error Occurred!"})
  }
};

export const updateBlog =async(req,res,next)=>{
    try{
        const { title, description} =req.body;
        const blogId =req.params.id;
        
        let blog = await Blogs.findByIdAndUpdate(blogId,{
            title,
            description
        })
        if(!blog){
            return res.status(500).json({message:"unable to Update the Blog"});
        }
        return res.status(200).json({blog});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Error occurred"});
    }
};

export const getById= async(req,res,next)=>{
    try{
        const id =req.params.id;
        let blog =await Blogs.findById(id);

        if(!blog){
            return res.status(404).json({message: "No Blog Found"});
        }
        return res.status(200).json({blog});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Error Occurred!!"});
    }
};

export const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let blog = await Blogs.findOneAndRemove({ _id: id }).populate('user');
        
        if (!blog) {
            return res.status(404).json({ message: "Unable to find it" });
        }
        
        await blog.user.blog.pull(blog);
        await blog.user.save();

        return res.status(200).json({ message: "Blog deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error Occurred!" });
    }
};

export const getByUserId = async(req, res, next)=>{
    try{
        const userId = req.params.id;
        let userBlogs = await User.findById(userId).populate("blog");
        if(!userBlogs){
            return res.status(404).json({message:"No Blog Found"});
        }
        return res.status(200).json({blogs:userBlogs})
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Error Occurred"});
    }

};
