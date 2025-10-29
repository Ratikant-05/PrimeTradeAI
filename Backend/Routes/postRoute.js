import express from 'express'
import { addPost, updatePost, deletePost, getAllPosts } from '../Controllers/postController.js' 

const router = express.Router()

router.post('/addPost', addPost) //done
router.get('/getAllPosts', getAllPosts) //done
router.put("/update/:id", updatePost); //done
router.delete("/delete/:id", deletePost);

export default router