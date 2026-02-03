import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'comment cannot be more than 100 characters'],
    },

    isApproved: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true },
);

reviewSchema.index({ post: 1 });

export default mongoose.model('Review', reviewSchema);
