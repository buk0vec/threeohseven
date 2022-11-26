import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import {
  createUser,
  dbConnection as udbc,
  loginUser,
  refreshDbConnection,
} from "./user-service";
import { IUser, UserSchema } from "./models/user";
import mongoose, { Model, Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let dbConnection: Connection;
beforeAll((done) => {
  dbConnection = mongoose.createConnection(
    process.env.MONGODB_CONNECTION_URL ?? ""
  );
  done();
});

afterAll(async () => {
  await dbConnection.destroy();
});
describe("user model", () => {
  let username = "";
  let userModel: Model<IUser>;
  beforeAll(() => {
    userModel = dbConnection.model("Users", UserSchema);
    username = "test_" + Date.now().toString();
  });
  afterAll(async () => {
    await userModel.findOneAndRemove({ username });
    await udbc.close();
  });
  it("can create a new account", async () => {
    const result = await createUser(username, "testpassword");
    expect(result?._id).not.toBeNull();
    expect(result?.username).toEqual(username);
    expect(result?.password).not.toBeNull();
    expect(result?.password).not.toEqual("testpassword");
    const dbres = await userModel.findOne({ username });
    expect(dbres).not.toBeNull();
    expect(dbres?._id.toString()).toEqual(result?.id.toString());
    expect(dbres?.username).toEqual(result?.username);
    expect(result?.password).toEqual(result?.password);
  });
  it("does not create an account if the username is taken", async () => {
    const result = await createUser(username, "testpassword");
    expect(result).toBeUndefined();
  });
  it("can log in a user", async () => {
    const result = await loginUser(username, "testpassword");
    expect(result).toBe(true);
  });
  it("rejects an incorrect password", async () => {
    const result = await loginUser(username, "wrongpassword");
    expect(result).toBe(false);
  });
  it("rejects a nonexistent username", async () => {
    const result = await loginUser(
      "test_" + (Date.now() + 60000 + toString()),
      "testpassword"
    );
    expect(result).toBe(false);
  });
  /* Testing MongoDB errors */
  it("throws an error if there is a MongoDB issue when creating an account", async () => {
    // close db Connection
    await udbc.close(true);
    expect(createUser(username, "testpassword")).rejects.toMatch(/err/);
    refreshDbConnection();
  });
  it("throws an error if there is a MongoDB issue when logging in", async () => {
    await udbc.close(true);
    expect(loginUser(username, "testpassword")).rejects.toMatch(/dberr/);
  });
});
