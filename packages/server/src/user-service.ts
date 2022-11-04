import mongoose from "mongoose";
import type { Connection } from "mongoose";
import { UserSchema } from "./models/user";
import { genSalt, hash, compare } from "bcrypt";

let dbConnection: Connection;

export const getDbConnection = () => {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(
      process.env.MONGODB_CONNECTION_URL ?? ""
    );
  }
  return dbConnection;
};

// Creates a user in DB with a username and password
// Username and password MUST meet character constraints
// Returns the username + hashed pass, undefined if username exists,
// throws if there is a MongoDB error
export const createUser = async (username: string, password: string) => {
  try {
    const userModel = getDbConnection().model("User", UserSchema);
    if (await userModel.exists({ username: username })) {
      return undefined;
    }
    const salt = await genSalt(10);
    const pass_hash = await hash(password, salt);
    const userToAdd = new userModel({
      username: username,
      password: pass_hash,
    });
    const saved_user = await userToAdd.save();
    return saved_user;
  } catch {
    throw "farts";
  }
};

// Attempts to authenticate a user with a username and password
// Returns true if it checks out, false if it doesn't, throws if there is a MongoDB error
export const loginUser = async (username: string, password: string) => {
  try {
    const userModel = getDbConnection().model("User", UserSchema);
    const userQuery = await userModel.findOne({ username: username });
    if (userQuery) {
      const valid = await compare(password, userQuery.password);
      return valid;
    }
    return false;
  } catch {
    throw "dberr";
  }
};
