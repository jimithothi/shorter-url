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
    trim: true,
    index: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});
export const Url = mongoose.model<IUrl>('Url', urlSchema); 