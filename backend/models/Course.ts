import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  id: string;
  title: string;
  category: 'UG' | 'PG' | 'PhD';
  duration: string;
  description: string;
  eligibility: string;
  fees?: string;
  featured: boolean;
}

const CourseSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['UG', 'PG', 'PhD'], required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  fees: { type: String },
  featured: { type: Boolean, required: true },
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', CourseSchema);