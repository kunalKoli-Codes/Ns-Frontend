import express, { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create BlogPost
router.post('/', async (req: Request, res: Response) => {
  try {
    const blogPost: IBlogPost = new BlogPost({ ...req.body, id: uuidv4() });
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
});

// Get All BlogPosts
router.get('/', async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
});

// Get BlogPost by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findOne({ id: req.params.id });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
});

// Update BlogPost
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error });
  }
});

// Delete BlogPost
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findOneAndDelete({ id: req.params.id });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
});

export default router;