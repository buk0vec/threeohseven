import mongoose from "mongoose";

export interface IUser {
  /*
   * The username of the user. Must be at least 3 characters, only numbers and letters
   */
  username: string;
  /*
   * The hashed password of the user.
   * */
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
