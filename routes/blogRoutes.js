import express from "express";
import { addBlog, deleteById, getAllBlogs, getById, getByUserId, updateBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post('/add', addBlog);
router.put('/update/:id',updateBlog);
router.get('/:id',getById);
router.delete('/:id',deleteById);
router.get('/user/:id',getByUserId);

export default router;
