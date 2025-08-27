import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Career' | 'Finance' | 'Education' | 'Job Tips';
  author: string;
  publishedAt: string;
  featuredImage: string;
  seoTitle?: string;
  seoDescription?: string;
}

const BlogPostSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Career', 'Finance', 'Education', 'Job Tips'], required: true },
  author: { type: String, required: true },
  publishedAt: { type: String, required: true },
  featuredImage: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
}, { timestamps: true });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);