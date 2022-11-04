import mongoose from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
    //		validate(value: string) {
    //			if (value.length < 3) throw new Error('Username cannot be less than 3 characters')
    //		}
  },
  password: {
    type: String,
    required: true,
    //		validate(value: string) {
    //			if (value.length < 6) throw new Error('Password cannot be less than 6 characters')
    //		}
  },
});
