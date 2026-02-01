import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please add a username'],
      minLength: [3, 'name must have less than 3 character'],
      maxLength: [20, 'name must have more than 20 character'],
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      validate: {
        validator: validator.isEmail,
        message: 'please add a valid email',
      },
    },

    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: [8, 'password must have more than 6 characters'],
      select: false,
      validate: {
        validator: validator.isStrongPassword,
        message: 'please add a strong password',
      },
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timeseries: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method.mathPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

export default mongoose.model('User', userSchema);
