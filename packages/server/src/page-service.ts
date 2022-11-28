import mongoose from "mongoose";
import type { Connection } from "mongoose";
import {
  IPage,
  PageModelType,
  PageSchema,
  ILink,
  ICategory,
} from "./models/page";
import _ from "lodash";

type WithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Exposed for testing
export let dbConnection: Connection;

const getDbConnection = () => {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(
      process.env.MONGODB_CONNECTION_URL as string
    );
    // refreshDbConnection();
  }
  return dbConnection;
};

// Given a username, retrieve the page that they own from the database
// Returns the resulting data, undefined if not found
// throws if MongoDB errors
export const getPage = async (username: string) => {
  try {
    const pageModel = getDbConnection().model("Page", PageSchema);
    const page = await pageModel.findOne({ owner: username });
    return page;
  } catch {
    throw "err";
  }
};

// Creates a default page for a user using a valid bg color, a valid avatar string, and an array with four valid colors for the categories
// the user already has a page, and throws if MongoDB errors
export const createPage = async (
  username: string,
  avatar: string,
  color: string,
  categories: string[]
) => {
  try {
    const pageModel = getDbConnection().model<IPage, PageModelType>(
      "Page",
      PageSchema
    );
    const exists = await pageModel.exists({ owner: username });
    if (exists) {
      return undefined;
    } else {
      // Using default colors
      const catnames = ["Social Media", "Business", "Personal", "Other"];
      const defaultPage = {
        owner: username,
        title: username,
        color: color,
        avatar: avatar,
        categories: catnames.map((name, i) => {
          return {
            name: name,
            color: categories[i],
          };
        }),
        links: [],
      };
      return pageModel.create(defaultPage).then(() => true);
    }
  } catch {
    throw "page create err";
  }
};

export const updatePage = async (user: string, payload: Partial<IPage>) => {
  const pageModel = getDbConnection().model("Page", PageSchema);
  return pageModel
    .findOneAndUpdate({ owner: user }, payload)
    .then((doc) => {
      if (doc) {
        return payload;
      } else {
        return undefined;
      }
    })
    .catch(() => {
      throw "update error";
    });
};

export const addCategory = async (
  user: string,
  payload: Omit<IPage["categories"][number], "_id">
) => {
  const pageModel = getDbConnection().model("Page", PageSchema);
  return pageModel
    .findOneAndUpdate(
      { owner: user },
      {
        $push: {
          categories: payload,
        },
      },
      { new: true }
    )
    .then((doc) => {
      if (doc) {
        return doc.categories[doc.categories.length - 1];
      } else {
        return undefined;
      }
    })
    .catch(() => {
      throw "category add error";
    });
};

export const editCategory = async (
  user: string,
  payload: WithRequired<ICategory, "_id">
) => {
  const pageModel = getDbConnection().model<IPage, PageModelType>(
    "Page",
    PageSchema
  );
  const mutation = _.mapKeys(payload, (_, k) => "categories.$." + k);

  const updated = await pageModel.findOneAndUpdate(
    {
      owner: user,
      "categories._id": payload._id,
    },
    { $set: { ...mutation } },
    { new: true }
  );
  // return updated;
  return updated?.categories.find((c) => c._id.equals(payload._id));
};

export const deleteCategory = async (
  user: string,
  payload: { _id: string }
) => {
  const pageModel = getDbConnection().model<IPage, PageModelType>(
    "Page",
    PageSchema
  );
  const removed = await pageModel.findOneAndUpdate(
    { owner: user },
    { $pull: { categories: { _id: payload._id } } },
    { new: true }
  );
  if (removed) {
    await pageModel.updateMany(
      { owner: user, "links.category": payload._id },
      { $set: { "links.$[link].category": null } },
      {
        arrayFilters: [{ "link.category": payload._id }],
        new: true,
        multi: true,
      }
    );
    // Type assertion here because newLinks will never not find the user's page if we were just able to edit the user's page.
    const newLinks = (await pageModel.findOne({ owner: user })) as IPage;
    return { links: newLinks.links, categories: removed.categories };
  }
  return undefined;
};

export const addLink = async (user: string, payload: Omit<ILink, "_id">) => {
  const pageModel = getDbConnection().model<IPage, PageModelType>(
    "Page",
    PageSchema
  );
  const updated = await pageModel.findOneAndUpdate(
    { owner: user },
    { $push: { links: { ...payload } } },
    { new: true }
  );
  if (updated) {
    return updated.links[updated.links.length - 1];
  }
  return undefined;
};

export const editLink = async (
  user: string,
  payload: WithRequired<ILink, "_id">
) => {
  const pageModel = getDbConnection().model<IPage, PageModelType>(
    "Page",
    PageSchema
  );
  const mutation = _.mapKeys(payload, (_, k) => "links.$." + k);

  const updated = await pageModel.findOneAndUpdate(
    {
      owner: user,
      "links._id": payload._id,
    },
    { $set: { ...mutation } },
    { new: true }
  );
  // return updated;
  return updated?.links.find((c) => c._id.equals(payload._id));
};

export const deleteLink = async (user: string, payload: { _id: string }) => {
  const pageModel = getDbConnection().model<IPage, PageModelType>(
    "Page",
    PageSchema
  );
  try {
    const removed = await pageModel.findOneAndUpdate(
      { owner: user },
      { $pull: { links: { _id: payload._id } } },
      { new: true }
    );
    if (removed) {
      return removed.links;
    }
    return undefined;
  } catch {
    throw "link delete error";
  }
};
