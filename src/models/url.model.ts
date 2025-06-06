import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  userId: mongoose.Types.ObjectId;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
urlSchema.index({ shortUrl: 1 });
urlSchema.index({ userId: 1 });

export const Url = mongoose.model<IUrl>('Url', urlSchema); 