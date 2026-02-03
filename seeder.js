import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import path from 'path';
const __dirname = path.resolve();
import dotenv from 'dotenv';
dotenv.config();

// load models
import User from './models/user.js';
import Post from './models/post.js';
import Comment from './models/review.js';

// connect to DB
mongoose.connect(process.env.MONGO_URI);

// read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/user.json`, 'utf-8'),
);

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/data/post.json`, 'utf-8'),
);

const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/data/review.json`, 'utf-8'),
);

// import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Post.create(posts);
    await Comment.create(comments);
    console.log('data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();
    console.log('data destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
