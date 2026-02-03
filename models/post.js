import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'please add a title'],
      trim: true,
      maxlength: [20, 'title cannot be more than 20 characters'],
    },

    content: {
      type: String,
      required: [true, 'Please add a content'],
      maxlength: [200, 'Description cannot be more than 100 characters'],
    },

    slug: String,

    isPublished: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

//make slugify URL
postSchema.pre('save', async function () {
  this.slug = slugify(this.title, { lower: true });
});

export default mongoose.model('Post', postSchema);
