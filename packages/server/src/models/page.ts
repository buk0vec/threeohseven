import mongoose from "mongoose";

export interface ICategory {
  name: string;
  color: string;
  _id: mongoose.Types.ObjectId;
}

export interface ILink {
  name: string;
  url: string;
  category: string | null;
  _id: mongoose.Types.ObjectId;
}

export interface IPage {
  owner: string;
  categories: Array<ICategory>;
  color: string;
  avatar: string;
  title: string;
  links: Array<ILink>;
}

type PageDocumentProps = {
  categories: mongoose.Types.DocumentArray<ICategory>;
  links: mongoose.Types.DocumentArray<ILink>;
};

export type PageModelType = mongoose.Model<IPage, {}, PageDocumentProps>;

export const PageSchema = new mongoose.Schema<IPage, PageModelType>({
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
    new mongoose.Schema<ILink>({
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
    }),
  ],
  categories: [
    new mongoose.Schema<ICategory>({
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    }),
  ],
});
