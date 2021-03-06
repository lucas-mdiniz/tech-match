import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    email: {
      type: String,
      required: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, 
      validate: {
        validator:(role: string) => ['designer', 'developer'].includes(role)
      },
      message: () => `Role must be a designer or a developer`
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          hidden: true
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'user',
  },
);

export interface IUser extends Document {
  name: string;
  password?: string;
  email: string;
  active: boolean;
  role: string;
  tokens: Array<Object>;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
}

schema.pre<IUser>('save', function encryptPasswordHook(next) {
  // Hash the password
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

schema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

// this will make find, findOne typesafe
const UserModel: Model<IUser> = mongoose.model('User', schema);

export default UserModel;
