import mongoose from "mongoose";

export interface ICategory {
  name: string;
  color: string;
}

export interface ILink {
  name: string;
  url: string;
  category: string | null;
}

export interface IPage {
  owner: string;
  categories: Array<ICategory>;
  color: string;
  avatar: string;
  title: string;
  links: Array<ILink>;
}

export const PageSchema = new mongoose.Schema<IPage>({
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  links: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
  categories: [
    {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],
});
