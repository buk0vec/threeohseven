import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { createUser, dbConnection as udbc } from "./user-service";
import { IUser, UserSchema } from "./models/user";
import mongoose, { Model, Connection } from "mongoose";
import dotenv from "dotenv";
import {
  addCategory,
  addLink,
  createPage,
  dbConnection as pdbc,
  deleteCategory,
  deleteLink,
  editCategory,
  editLink,
  getPage,
  updatePage,
} from "./page-service";
import { IPage, PageModelType, PageSchema } from "./models/page";

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
describe("page model", () => {
  let username = "";
  let categoryId: mongoose.Types.ObjectId | undefined;
  let linkId: mongoose.Types.ObjectId | undefined;
  let userModel: Model<IUser>;
  let pageModel: PageModelType;
  beforeAll(async () => {
    userModel = dbConnection.model("Users", UserSchema);
    pageModel = dbConnection.model<IPage, PageModelType>("Page", PageSchema);
    username = "test_" + Date.now().toString() + "_ps";
    await createUser(username, "testpassword");
  });
  afterAll(async () => {
    await pageModel.findOneAndRemove({ owner: username });
    await pdbc.close();
    await userModel.findOneAndRemove({ username });
    await udbc.close();
  });
  it("can create a page", async () => {
    const page = await createPage(username, "avatar.png", "#FFFFFF", [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ]);
    expect(page).not.toBeUndefined();
    expect(page).toBe(true);
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.avatar).toEqual("avatar.png");
    expect(dbpage?.color).toEqual("#FFFFFF");
    expect(dbpage?.categories.length).toEqual(4);
    ["Social Media", "Business", "Personal", "Other"].forEach((n, i) =>
      expect(dbpage?.categories[i]).toEqual(
        expect.objectContaining({
          name: n,
          color: "#FFFFFF",
        })
      )
    );
    expect(dbpage?.links).toEqual([]);
  });
  it("does not create duplicate pages", async () => {
    const page = await createPage(username, "avatar2.png", "#000000", [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ]);
    expect(page).toBeUndefined();
    const res = await pageModel.count({ owner: username });
    expect(res).toEqual(1);
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.color).toEqual("#FFFFFF");
    expect(dbpage?.avatar).toEqual("avatar.png");
  });
  it("can get a page", async () => {
    const dbpage = await getPage(username);
    expect(dbpage).toEqual(
      expect.objectContaining({
        owner: username,
        color: "#FFFFFF",
        title: username,
        avatar: "avatar.png",
        links: [],
      })
    );
    ["Social Media", "Business", "Personal", "Other"].forEach((n, i) =>
      expect(dbpage?.categories[i]).toEqual(
        expect.objectContaining({
          name: n,
          color: "#FFFFFF",
        })
      )
    );
  });
  it("can update fields on the page", async () => {
    const page = await updatePage(username, { color: "#FFFF00" });
    expect(page?.color).toEqual("#FFFF00");
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.color).toEqual("#FFFF00");
  });
  it("does not update pages that do not exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    const res = await updatePage(fake, { color: "#FFFF00" });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("can add a category to the page", async () => {
    const res = await addCategory(username, {
      name: "Test Category",
      color: "#00FFFF",
    });
    expect(res).toEqual(
      expect.objectContaining({ name: "Test Category", color: "#00FFFF" })
    );
    expect(res?._id).not.toBeUndefined();
    categoryId = res?._id;
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.categories.length).toEqual(5);
    expect(dbpage?.categories[dbpage?.categories.length - 1]).toEqual(
      expect.objectContaining({ name: "Test Category", color: "#00FFFF" })
    );
  });
  it("doesn't add categories to pages that don't exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    const res = await addCategory(fake, {
      name: "Test Category",
      color: "#00FFFF",
    });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("can edit a category", async () => {
    if (!categoryId) {
      throw new Error("should have generated a category ID");
    }
    const res = await editCategory(username, {
      _id: categoryId,
      color: "#00FF00",
    });
    expect(res?.color).toEqual("#00FF00");
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.categories.length).toEqual(5);
    expect(dbpage?.categories[dbpage?.categories.length - 1]).toEqual(
      expect.objectContaining({ name: "Test Category", color: "#00FF00" })
    );
    ["Social Media", "Business", "Personal", "Other"].forEach((n, i) =>
      expect(dbpage?.categories[i]).toEqual(
        expect.objectContaining({
          name: n,
          color: "#FFFFFF",
        })
      )
    );
  });
  it("should not edit categories for pages that don't exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    if (!categoryId) {
      throw new Error("should have generated a category ID");
    }
    const res = await editCategory(fake, {
      _id: categoryId,
      color: "#00FF00",
    });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("can add a link", async () => {
    const res = await addLink(username, {
      name: "Test link",
      url: "google.com",
      category: null,
    });
    expect(res).not.toBeUndefined();
    expect(res).toEqual(
      expect.objectContaining({
        name: "Test link",
        url: "google.com",
        category: null,
      })
    );
    expect(res?._id).not.toBeUndefined();
    linkId = res?._id;
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.links.length).toBe(1);
    expect(dbpage?.links[0]).toEqual(
      expect.objectContaining({
        _id: linkId,
        name: "Test link",
        url: "google.com",
        category: null,
      })
    );
  });
  it("does not add links to pages that don't exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    const res = await addLink(fake, {
      name: "Test link",
      url: "google.com",
      category: null,
    });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("can edit a link", async () => {
    if (!linkId) {
      throw new Error("should have generated a link ID");
    }
    const res = await editLink(username, {
      _id: linkId,
      category: categoryId?.toString(),
    });
    expect(res).not.toBeUndefined();
    expect(res).toEqual(
      expect.objectContaining({
        _id: linkId,
        category: categoryId?.toString(),
        url: "google.com",
        name: "Test link",
      })
    );
    const dbpage = await pageModel.findOne({ owner: username });
    expect(dbpage?.links[0]).toEqual(
      expect.objectContaining({
        name: "Test link",
        url: "google.com",
        category: categoryId?.toString(),
      })
    );
  });
  it("does not edit links for pages that do not exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    if (!linkId) {
      throw new Error("should have generated a link ID");
    }
    const res = await editLink(fake, {
      _id: linkId,
      category: categoryId?.toString(),
    });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("can remove a category", async () => {
    const categories = (await getPage(username))?.categories;
    const cid = (categories && categories[0]._id.toString()) ?? null;
    await addLink(username, {
      name: "Another category",
      url: "yahoo.com",
      category: cid,
    });
    const res = await deleteCategory(username, {
      _id: categoryId?.toString() ?? "",
    });
    expect(res).not.toBeUndefined();
    expect(res?.categories.length).toEqual(4);
    expect(res?.categories).not.toContain(
      expect.objectContaining({ _id: categoryId })
    );
    expect(res?.links?.length).toEqual(2);
    expect(res?.links ? res?.links[0] : undefined).toEqual(
      expect.objectContaining({
        name: "Test link",
        url: "google.com",
        category: null,
      })
    );
    expect(res?.links ? res?.links[1] : undefined).toEqual(
      expect.objectContaining({
        name: "Another category",
        url: "yahoo.com",
        category: cid,
      })
    );
    const dbpage = await getPage(username);
    expect(dbpage?.categories.length).toEqual(4);
    expect(dbpage?.categories).not.toContain(
      expect.objectContaining({ _id: categoryId })
    );
    expect(dbpage?.links?.length).toEqual(2);
    expect(dbpage?.links ? dbpage?.links[0] : undefined).toEqual(
      expect.objectContaining({
        name: "Test link",
        url: "google.com",
        category: null,
      })
    );
    expect(dbpage?.links ? dbpage?.links[1] : undefined).toEqual(
      expect.objectContaining({
        name: "Another category",
        url: "yahoo.com",
        category: cid,
      })
    );
    ["Social Media", "Business", "Personal", "Other"].forEach((n, i) =>
      expect(dbpage?.categories[i]).toEqual(
        expect.objectContaining({
          name: n,
          color: "#FFFFFF",
        })
      )
    );
  });
  it("does not remove categories for pages that do not exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    const res = await deleteCategory(fake, {
      _id: categoryId?.toString() ?? "",
    });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("can remove a link", async () => {
    const res = await deleteLink(username, {
      _id: linkId?.toString() ?? "NULL",
    });
    expect(res).not.toBeUndefined();
    expect(res?.length).toBe(1);
    expect(res).not.toContain(expect.objectContaining({ _id: linkId }));
    expect(res && res[0]).toEqual(
      expect.objectContaining({ name: "Another category", url: "yahoo.com" })
    );
    const dbpage = await getPage(username);
    expect(dbpage?.links.length).toBe(1);
    expect(dbpage?.links.length).not.toContain(
      expect.objectContaining({ _id: linkId })
    );
    expect(dbpage?.links && dbpage?.links[0]).toEqual(
      expect.objectContaining({ name: "Another category", url: "yahoo.com" })
    );
  });
  it("does not remove links for pages that do not exist", async () => {
    const fake = "test_" + Date.now().toString() + "_fake";
    const res = await deleteLink(fake, { _id: linkId?.toString() ?? "" });
    expect(res).toBeUndefined();
    const dbpage = await pageModel.findOne({ owner: fake });
    expect(dbpage).toBeNull();
  });
  it("throws when db connection fails - get page", async () => {
    await pdbc.close();
    expect(getPage(username)).rejects.toMatch(/err/);
  });
  it("throws when db connection fails - create page", async () => {
    expect(
      createPage(username, "avatar.png", "#FFFFFF", [
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
      ])
    ).rejects.toMatch(/err/);
  });
  it("throws when db connection fails  - update page", async () => {
    expect(updatePage(username, { color: "#FFFF00" })).rejects.toMatch(
      /update error/
    );
  });
  it("throws when db connection fails  - add category", async () => {
    expect(
      addCategory(username, { name: "My category", color: "#FFFF00" })
    ).rejects.toMatch(/category add error/);
  });
  it("throws when db connection fails - remove category", async () => {
    expect(
      deleteCategory(username, { _id: categoryId?.toString() ?? "" })
    ).rejects.not.toBeNull();
  });
  it("throws when db connection fails - delete link", async () => {
    expect(
      deleteLink(username, { _id: linkId?.toString() ?? "" })
    ).rejects.toMatch(/link delete error/);
  });
});
