import mongoose from "mongoose";
import type { Connection } from "mongoose";
import { IPage, PageSchema } from "./models/page";

let dbConnection: Connection;

const getDbConnection = () => {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(
      process.env.MONGODB_CONNECTION_URL ?? ""
    );
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
    const pageModel = getDbConnection().model("Page", PageSchema);
    const exists = await pageModel.exists({ owner: username });
    if (exists) {
      return undefined;
    } else {
      // Using default colors
      const catnames = ["Social Media", "Business", "Personal", "Other"];
      const defaultPage: IPage = {
        owner: username,
        title: username,
        color: color,
        avatar: avatar,
        categories: categories.map((_, i) => {
          return {
            name: catnames[i],
            color: i < 4 ? categories[i] : "#0000FF",
          };
        }),
        links: [],
      };
      return pageModel
        .create(defaultPage)
        .then(() => true)
        .catch(() => {
          throw "page create error";
        });
    }
  } catch {
    throw "err";
  }
};
